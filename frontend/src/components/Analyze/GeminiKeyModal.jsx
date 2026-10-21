import React, { useState, useEffect } from "react";
import { Key, X, CheckCircle, Sparkles, ExternalLink, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const GeminiKeyModal = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [envKeyExists, setEnvKeyExists] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gemini_api_key") || "";
      setSavedKey(stored);
      setApiKey(stored);
      if (import.meta.env.VITE_GEMINI_API_KEY) {
        setEnvKeyExists(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      localStorage.removeItem("gemini_api_key");
      setSavedKey("");
      toast.success("Kunci API dihapus. Menggunakan scanner bawaan.");
      onClose();
      return;
    }

    if (!trimmed.startsWith("AIzaSy")) {
      toast.error("Format kunci API sepertinya tidak sesuai (biasanya diawali 'AIzaSy...')");
      return;
    }

    localStorage.setItem("gemini_api_key", trimmed);
    setSavedKey(trimmed);
    toast.success("Kunci Gemini AI berhasil disimpan!");
    onClose();
  };

  const handleRemove = () => {
    localStorage.removeItem("gemini_api_key");
    setSavedKey("");
    setApiKey("");
    toast.success("Kunci Gemini API lokal dihapus.");
  };

  const testConnection = async () => {
    const keyToTest = apiKey.trim() || savedKey || import.meta.env.VITE_GEMINI_API_KEY;
    if (!keyToTest) {
      toast.error("Masukkan kunci API terlebih dahulu.");
      return;
    }

    setIsTesting(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${keyToTest}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Halo, balas dengan 'OK' jika koneksi berhasil." }] }],
          }),
        }
      );

      if (res.ok) {
        toast.success("Koneksi ke Google Gemini AI Berhasil! 🚀", { duration: 4000 });
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(`Koneksi ditolak: ${err.error?.message || "Cek kembali API key Anda"}`);
      }
    } catch {
      toast.error("Gagal menghubungi Google AI. Periksa koneksi internet.");
    } finally {
      setIsTesting(false);
    }
  };

  const hasActiveKey = Boolean(savedKey || envKeyExists);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-green-50">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-green-500/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Hubungkan Gemini AI</h3>
            <p className="text-xs text-gray-500">Analisis makanan cerdas & hitung kalori akurat</p>
          </div>
        </div>

        {hasActiveKey && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-3.5 py-2.5 text-xs font-semibold text-green-700">
            <CheckCircle size={16} className="text-green-600 shrink-0" />
            <span>
              {envKeyExists
                ? "Terhubung via Vercel Environment (VITE_GEMINI_API_KEY)"
                : "Terhubung via Kunci Pribadi di Browser"}
            </span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 pr-10 font-mono"
              />
              <Key size={16} className="absolute right-3.5 top-3 text-gray-400 pointer-events-none" />
            </div>
            <p className="mt-1.5 text-[11px] text-gray-400">
              Kunci tersimpan aman di browser Anda dan langsung digunakan untuk scan foto makanan.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              <span>Dapatkan API Key Gratis</span>
              <ExternalLink size={12} />
            </a>

            {apiKey && (
              <button
                type="button"
                onClick={testConnection}
                disabled={isTesting}
                className="text-xs font-bold text-gray-600 hover:text-green-600 transition disabled:opacity-50"
              >
                {isTesting ? "Menguji..." : "⚡ Coba Koneksi"}
              </button>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {savedKey && (
              <button
                type="button"
                onClick={handleRemove}
                className="p-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
                title="Hapus Kunci"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-xl bg-green-500 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/25 hover:bg-green-600 transition"
            >
              Simpan & Hubungkan AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiKeyModal;
