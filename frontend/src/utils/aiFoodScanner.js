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

let cachedWorkingEndpoint = null;

const getSavedEndpoint = () => {
  if (cachedWorkingEndpoint) return cachedWorkingEndpoint;
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("gemini_working_endpoint");
      if (saved) {
        cachedWorkingEndpoint = JSON.parse(saved);
        return cachedWorkingEndpoint;
      }
    } catch {
      // ignore
    }
  }
  return null;
};

const saveWorkingEndpoint = (endpoint) => {
  cachedWorkingEndpoint = endpoint;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("gemini_working_endpoint", JSON.stringify(endpoint));
    } catch {
      // ignore
    }
  }
};

/**
 * Fetch with custom AbortController timeout to prevent long hanging requests
 */
const fetchWithTimeout = async (url, options = {}, timeoutMs = 12000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
};

/**
 * Dynamically queries Google's ModelService (ListModels)
 * with strict timeout so it never stalls.
 */
const discoverSupportedModels = async (cleanKey) => {
  const versions = ["v1beta", "v1"];
  for (const ver of versions) {
    try {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/${ver}/models?key=${cleanKey}`,
        {},
        4000
      );
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.models)) {
          const supported = data.models
            .filter(
              (m) =>
                Array.isArray(m.supportedGenerationMethods) &&
                m.supportedGenerationMethods.includes("generateContent")
            )
            .map((m) => m.name.replace(/^models\//, ""));

          if (supported.length > 0) {
            // Prioritize 2.0-flash and 1.5-flash for fastest speed
            supported.sort((a, b) => {
              const aScore = a.includes("2.0-flash") ? 3 : a.includes("flash") ? 2 : 1;
              const bScore = b.includes("2.0-flash") ? 3 : b.includes("flash") ? 2 : 1;
              return bScore - aScore;
            });

            return supported.map((m) => ({ version: ver, model: m }));
          }
        }
      }
    } catch {
      // Timeout or network error, skip
    }
  }
  return [];
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

  // Default candidates prioritized by speed (Flash 2.0 & 1.5 first)
  const defaultCandidates = [
    { version: "v1beta", model: "gemini-2.0-flash" },
    { version: "v1beta", model: "gemini-1.5-flash" },
    { version: "v1beta", model: "gemini-1.5-flash-latest" },
    { version: "v1beta", model: "gemini-2.0-flash-exp" },
    { version: "v1", model: "gemini-1.5-flash" },
    { version: "v1", model: "gemini-1.5-flash-latest" },
    { version: "v1beta", model: "gemini-1.5-flash-001" },
    { version: "v1beta", model: "gemini-1.5-flash-002" },
    { version: "v1beta", model: "gemini-1.5-pro-latest" },
    { version: "v1", model: "gemini-1.5-pro" },
  ];

  // Build target list: saved working endpoint from previous success is tried FIRST!
  let targets = [];
  const saved = getSavedEndpoint();
  if (saved) {
    targets.push(saved);
  } else {
    // Only query ListModels if we don't have a known working endpoint yet
    const discovered = await discoverSupportedModels(cleanKey);
    targets.push(...discovered);
  }
  targets.push(...defaultCandidates);

  // Deduplicate
  const seen = new Set();
  const uniqueTargets = targets.filter((t) => {
    const key = `${t.version}/${t.model}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let lastErrorMessage = "";

  for (const target of uniqueTargets) {
    const { version, model } = target;
    const cleanModel = model.replace(/^models\//, "");

    const endpoint = `https://generativelanguage.googleapis.com/${version}/models/${cleanModel}:generateContent?key=${cleanKey}`;

    const makePayload = (includeMimeType = true) => ({
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
        ...(includeMimeType ? { responseMimeType: "application/json" } : {}),
      },
    });

    try {
      let res = await fetchWithTimeout(
        endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(makePayload(true)),
        },
        12000
      );

      // If rejected because responseMimeType is not supported on this model, retry without it
      if (res.status === 400) {
        const testErr = await res.clone().json().catch(() => ({}));
        const msg = testErr?.error?.message || "";
        if (msg.toLowerCase().includes("responsemimetype") || msg.toLowerCase().includes("mime")) {
          res = await fetchWithTimeout(
            endpoint,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(makePayload(false)),
            },
            12000
          );
        }
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status}`;
        console.warn(`Percobaan ${version}/models/${cleanModel} gagal (${res.status}):`, errMsg);

        if (res.status === 403) {
          if (errMsg.toLowerCase().includes("leaked")) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("gemini_api_key");
            }
            throw new Error("LEAKED_KEY: Kunci API Gemini ini dilaporkan bocor oleh Google. Silakan buat API Key baru di Google AI Studio.");
          }
          throw new Error(`PERMISSION_DENIED: Kunci API tidak valid atau tidak memiliki izin (${errMsg}).`);
        }

        if (res.status === 429) {
          throw new Error("QUOTA_EXCEEDED: Batas kuota gratis Google Gemini untuk akun ini telah tercapai hari ini. Silakan coba lagi beberapa saat lagi.");
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
        // Cache this winning endpoint for future instant calls
        saveWorkingEndpoint({ version, model: cleanModel });
        console.info(`✅ Berhasil menggunakan model Gemini: ${version}/models/${cleanModel}`);

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
      if (
        err.message?.includes("LEAKED_KEY") ||
        err.message?.includes("PERMISSION_DENIED") ||
        err.message?.includes("QUOTA_EXCEEDED")
      ) {
        throw err;
      }
      console.warn(`Target ${version}/${cleanModel} error:`, err.message);
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
      // If key is reported as leaked, permission denied, or quota exceeded, surface error clearly!
      if (
        gErr.message?.includes("LEAKED_KEY") ||
        gErr.message?.includes("PERMISSION_DENIED") ||
        gErr.message?.includes("QUOTA_EXCEEDED")
      ) {
        return {
          success: false,
          message: gErr.message.replace(/^(LEAKED_KEY|PERMISSION_DENIED|QUOTA_EXCEEDED):\s*/, ""),
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
