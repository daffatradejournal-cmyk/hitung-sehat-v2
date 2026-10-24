import apiClient from "./apiClient";

// Helper for local meal storage key (isolated per user)
const getLocalKey = (userId) => `meal_logs_${userId || "guest"}`;

// Helper to get local logs
const getLocalLogs = (userId) => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(getLocalKey(userId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Helper to save local logs
const saveLocalLogs = (userId, logs) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getLocalKey(userId), JSON.stringify(logs));
  } catch (e) {
    console.warn("Gagal simpan log makanan ke localStorage:", e);
  }
};

// ADD MEAL LOG
export const addMealLog = async (payload) => {
  try {
    // 1. Coba kirim ke Backend jika server aktif
    const response = await apiClient.post("/track/add", payload);
    return response.data;
  } catch (error) {
    console.warn(
      "Backend offline / belum terhubung, menyimpan log makanan secara lokal:",
      error?.message
    );

    // 2. Simpan secara lokal agar user bisa langsung tracking kalori tanpa terblokir
    const userId = payload.userId || "guest";
    const now = new Date();
    const jakartaDate = now.toLocaleDateString("en-CA", {
      timeZone: "Asia/Jakarta",
    });

    const newLog = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      userId,
      foodName: payload.foodName || "Makanan",
      calories: Math.round(Number(payload.calories) || 0),
      proteins: Math.round((Number(payload.proteins) || 0) * 10) / 10,
      carbs: Math.round((Number(payload.carbs) || 0) * 10) / 10,
      fat: Math.round((Number(payload.fat) || 0) * 10) / 10,
      quantity: Number(payload.quantity) || 1,
      mealType: payload.mealType || "meal",
      date: jakartaDate,
      day: jakartaDate,
      createdAt: now.toISOString(),
    };

    const existingLogs = getLocalLogs(userId);
    existingLogs.unshift(newLog); // log terbaru di paling atas
    saveLocalLogs(userId, existingLogs);

    // Update user stats lokal di profile
    try {
      const userProfileKey = `profile_${userId}`;
      const savedProfile = localStorage.getItem(userProfileKey);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        parsed.today_stats = parsed.today_stats || {};
        parsed.today_stats.meals_count =
          (parsed.today_stats.meals_count || 0) + 1;
        localStorage.setItem(userProfileKey, JSON.stringify(parsed));
      }
    } catch {}

    return {
      success: true,
      message: "Meal log added locally",
      data: newLog,
    };
  }
};

// GET DAILY LOGS
export const getDailyLogs = async (userId, date) => {
  try {
    // 1. Coba ambil dari Backend jika ada
    const response = await apiClient.get("/track/logs", {
      params: {
        userId,
        date,
      },
    });

    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    console.warn(
      "Backend offline / belum terhubung, memuat log makanan dari penyimpanan lokal:",
      error?.message
    );
  }

  // 2. Fallback: muat dari penyimpanan lokal per user
  const allLogs = getLocalLogs(userId);
  const targetDate =
    date ||
    new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Jakarta",
    });

  const filteredLogs = allLogs.filter((log) => {
    const logDate = log.day || (log.date ? String(log.date).slice(0, 10) : "");
    return logDate === targetDate;
  });

  const totals = filteredLogs.reduce(
    (acc, item) => ({
      calories:
        Math.round((acc.calories + (Number(item.calories) || 0)) * 10) / 10,
      proteins:
        Math.round((acc.proteins + (Number(item.proteins) || 0)) * 10) / 10,
      fat: Math.round((acc.fat + (Number(item.fat) || 0)) * 10) / 10,
      carbs: Math.round((acc.carbs + (Number(item.carbs) || 0)) * 10) / 10,
    }),
    { calories: 0, proteins: 0, fat: 0, carbs: 0 }
  );

  return {
    success: true,
    data: {
      logs: filteredLogs,
      totals,
    },
  };
};
