// CATEGORY CHIPS
export const categories = [
  "High Protein",
  "Low Carb",
  "Healthy",
  "Breakfast",
  "Low Sugar",
  "Snacks",
];

// CATEGORY FILTER RULES
export const categoryFilters = {
  "High Protein": (food) => food.proteins >= 20,
  "Low Carb": (food) => food.carbohydrate <= 10,
  Healthy: (food) => food.fat <= 10 && food.calories <= 300,
  Breakfast: (food) => food.calories >= 100 && food.calories <= 400,
  "Low Sugar": (food) => food.carbohydrate <= 8,
  Snacks: (food) => food.calories <= 250,
};
