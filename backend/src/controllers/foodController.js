const { searchExternalFood } = require("../services/externalApiService");
const prisma = require("../config/prisma");
const isDev = process.env.NODE_ENV !== "production";

let nutritionFallback = [];
try {
  nutritionFallback = require("../../data/nutrition_data.json");
} catch {
  nutritionFallback = [];
}

const getAllFoods = async (req, res, next) => {
  try {
    const foods = await prisma.food.findMany({
      take: 50,
    });
    return res.json({ success: true, data: foods });
  } catch (error) {
    console.warn("Database unavailable, serving nutrition fallback:", error.message);
    return res.json({ success: true, data: nutritionFallback.slice(0, 50) });
  }
};

const getFoodById = async (req, res, next) => {
  try {
    const foodId = Number(req.params.id);

    if (!Number.isInteger(foodId) || foodId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    try {
      const food = await prisma.food.findUnique({
        where: { id: foodId },
      });
      if (food) return res.json({ success: true, data: food });
    } catch {
      // ignore db error, check fallback
    }

    const fallbackFood = nutritionFallback.find((f) => f.id === foodId);
    if (!fallbackFood) {
      return res
        .status(404)
        .json({ success: false, message: "Makanan tidak ditemukan" });
    }
    return res.json({ success: true, data: fallbackFood });
  } catch (error) {
    next(error);
  }
};

const searchFood = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ success: false, message: "Keyword dibutuhkan" });
    }

    let localFoods = [];
    try {
      localFoods = await prisma.food.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        take: 10,
      });
    } catch (err) {
      console.warn("DB search failed, using local json search:", err.message);
      const q = keyword.toLowerCase();
      localFoods = nutritionFallback
        .filter((f) => f.name.toLowerCase().includes(q))
        .slice(0, 10);
    }

    let externalFoods = [];
    if (localFoods.length < 3) {
      try {
        externalFoods = await searchExternalFood(keyword);
      } catch {
        externalFoods = [];
      }
    }

    return res.status(200).json({
      success: true,
      data: [...localFoods, ...externalFoods],
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllFoods, getFoodById, searchFood };
