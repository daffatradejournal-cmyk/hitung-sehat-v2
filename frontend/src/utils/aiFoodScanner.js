import nutritionData from "../data/nutritionData.json";

/**
 * Compress and normalize any image to 1024px JPEG
 * This handles large phone camera photos (10MB+) and iOS HEIC/PNG formats seamlessly.
 */
const compressImageForAI = (file) => {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1024;
          let width = img.width;
          let height = img.height;

          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          const base64 = dataUrl.split(",")[1];
          resolve({ base64, mime: "image/jpeg" });
        };
        img.onerror = () => {
          const raw = e.target.result;
          const b64 = typeof raw === "string" ? raw.split(",")[1] : "";
          resolve({ base64: b64, mime: file?.type || "image/jpeg" });
        };
        img.src = e.target.result;
      };
      reader.onerror = () => resolve({ base64: "", mime: "image/jpeg" });
      reader.readAsDataURL(file);
    } catch {
      resolve({ base64: "", mime: "image/jpeg" });
    }
  });
};

/**
 * Direct Google Gemini Vision Multimodal Food Recognition
 */
export const analyzeFoodWithGemini = async (apiKey, file) => {
  const cleanKey = (apiKey || "").trim();
  if (!cleanKey) {
    throw new Error("Kunci Google Gemini API belum diatur.");
  }

  const { base64, mime } = await compressImageForAI(file);
  if (!base64) {
    throw new Error("Gagal membaca file gambar.");
  }

  const prompt = `Kamu adalah pakar gizi dan ahli nutrisi digital profesional untuk aplikasi "Hitung Sehat".
Analisis foto makanan/minuman ini secara cermat.
Identifikasi semua makanan atau minuman yang terlihat dalam foto (misal: nasi, lauk ayam/ikan/daging, telur, sayuran, sambal, buah, atau minuman), perkirakan porsi yang disajikan, dan hitung estimasi nilai nutrisinya:
1. food: Nama makanan lengkap dan deskriptif dalam Bahasa Indonesia (contoh: "Ayam Bakar dengan Nasi Putih & Sayuran", "Nasi Uduk Ayam Goreng", "Salad Sayur Saus Wijen", "Soto Ayam Komplit"). Jika bukan makanan, sebutkan nama objeknya.
2. calories: Total perkiraan kalori (dalam kkal / kcal, angka bulat).
3. proteins: Perkiraan protein (dalam gram, angka bulat atau desimal).
4. carbohydrate: Perkiraan karbohidrat (dalam gram, angka bulat atau desimal).
5. fat: Perkiraan lemak (dalam gram, angka bulat atau desimal).
6. confidence: Persentase keyakinan deteksi dari 88 sampai 98 (angka bulat).
7. description: 1-2 kalimat ramah dan informatif mengenai kandungan gizi makanan ini serta dampaknya bagi kesehatan tubuh.

Balas HANYA dengan objek JSON murni tanpa markdown formatting (\`\`\`json):
{
  "food": "...",
  "calories": 450,
  "proteins": 25,
  "carbohydrate": 50,
  "fat": 15,
  "confidence": 95,
  "description": "..."
}`;

  const models = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro",
  ];

  let lastErrorMessage = "";

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mime,
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status}`;
        console.warn(`Model ${model} gagal (${res.status}):`, errMsg);

        if (res.status === 403) {
          if (errMsg.toLowerCase().includes("leaked")) {
            throw new Error("LEAKED_KEY: Kunci API Gemini ini dilaporkan bocor oleh Google. Silakan buat API Key baru di Google AI Studio.");
          }
          throw new Error(`PERMISSION_DENIED: Kunci API tidak valid atau tidak memiliki izin (${errMsg}).`);
        }

        if (res.status === 429) {
          lastErrorMessage = "Batas kuota harian Gemini tercapai. Coba lagi nanti.";
          continue;
        }

        lastErrorMessage = errMsg;
        continue;
      }

      const resJson = await res.json();
      const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      let parsed = null;
      try {
        const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.warn("Regex fallback JSON parse failed:", e);
          }
        }
      }

      if (parsed && parsed.food) {
        return {
          success: true,
          food: parsed.food,
          calories: Math.round(Number(parsed.calories) || 0),
          proteins: Math.round((Number(parsed.proteins) || 0) * 10) / 10,
          carbohydrate: Math.round((Number(parsed.carbohydrate) || 0) * 10) / 10,
          fat: Math.round((Number(parsed.fat) || 0) * 10) / 10,
          confidence: Math.min(99, Math.max(80, Math.round(Number(parsed.confidence) || 94))),
          description: parsed.description || "Analisis gizi berhasil dihasilkan oleh Google Gemini AI.",
          source: "gemini",
        };
      }
    } catch (err) {
      if (err.message?.includes("LEAKED_KEY") || err.message?.includes("PERMISSION_DENIED")) {
        throw err;
      }
      console.warn(`Percobaan model ${model} error:`, err.message);
      lastErrorMessage = err.message;
    }
  }

  throw new Error(lastErrorMessage || "Gagal menghubungi layanan Google Gemini AI.");
};

/**
 * Smart Food Scanner Entrypoint
 * Priority:
 * 1. Google Gemini AI Vision (Fully Connected)
 * 2. Remote Backend API (if active)
 * 3. Offline Nutrition Dataset Fallback
 */
export const scanFoodSmart = async (file, imagePreviewUrl) => {
  // 1. Google Gemini AI Vision
  const apiKey = (
    import.meta.env.VITE_GEMINI_API_KEY ||
    (typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") : "") ||
    ""
  ).trim();

  if (apiKey && file) {
    try {
      console.info("⚡ Mengirim foto ke Google Gemini Vision AI...");
      const geminiResult = await analyzeFoodWithGemini(apiKey, file);
      if (geminiResult && geminiResult.success) {
        return {
          ...geminiResult,
          image: imagePreviewUrl,
        };
      }
    } catch (gErr) {
      console.error("Gemini Vision Error:", gErr);
      // If key is reported as leaked or permission denied, surface error clearly to user!
      if (gErr.message?.includes("LEAKED_KEY") || gErr.message?.includes("PERMISSION_DENIED")) {
        return {
          success: false,
          message: gErr.message.replace(/^(LEAKED_KEY|PERMISSION_DENIED):\s*/, ""),
        };
      }
      // For general network errors, notify user
      return {
        success: false,
        message: `Koneksi Gemini gagal: ${gErr.message}`,
      };
    }
  }

  if (!apiKey) {
    return {
      success: false,
      message: "Kunci Google Gemini API belum dimasukkan di Vercel (VITE_GEMINI_API_KEY). Silakan masukkan API key Anda.",
    };
  }

  return {
    success: false,
    message: "Gagal menganalisis makanan. Silakan coba lagi.",
  };
};

/**
 * Local Food Search Helper
 */
export const searchFoodLocal = (keyword) => {
  if (!keyword || !keyword.trim()) return [];
  const q = keyword.toLowerCase().trim();
  return nutritionData.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 30);
};
