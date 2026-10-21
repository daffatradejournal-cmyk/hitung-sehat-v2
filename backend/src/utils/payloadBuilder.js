const { calculateUserStatus } = require("./bmiUtils");

const safeNumber = (value, fallback = 0) => {
  const parsed = Number(value);

  return Number.isNaN(parsed) ? fallback : parsed;
};

const calculateAge = (birthdate) => {
  if (!birthdate) {
    return 20;
  }

  const today = new Date();

  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return Math.max(age, 1);
};

const buildAIPayload = (user, food) => ({
  user_age: safeNumber(calculateAge(user.birthdate), 20),

  user_weight: safeNumber(user.weight, 60),

  user_height: safeNumber(user.height, 170),

  user_status: String(
    calculateUserStatus(user.weight, user.height) || "Normal",
  ),

  user_goal: String(user.goal || "Stay Healthy"),

  food_cal: safeNumber(food.calories),

  food_prot: safeNumber(food.proteins),

  food_fat: safeNumber(food.fat),

  food_carb: safeNumber(food.carbohydrate),

  food_cluster: safeNumber(food.foodCluster),

  food_name: String(food.name || "Unknown Food"),
});

module.exports = {
  buildAIPayload,
  calculateAge,
};
