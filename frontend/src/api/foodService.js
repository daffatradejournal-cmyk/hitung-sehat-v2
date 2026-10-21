import apiClient from "./apiClient";
import nutritionData from "../data/nutritionData.json";

// GET ALL FOODS
export const getFoods = async () => {
  try {
    const response = await apiClient.get("/foods");
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data;
    }
    return { success: true, data: nutritionData.slice(0, 50) };
  } catch (error) {
    console.warn("API unreachable, using local nutrition data fallback:", error);
    return { success: true, data: nutritionData.slice(0, 50) };
  }
};
