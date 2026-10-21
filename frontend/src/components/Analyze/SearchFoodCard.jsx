import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { addMealLog } from "../../api/trackService";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const SearchFoodCard = ({ food }) => {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const { fetchProfile } = useUser();

  // ADD TO MEAL
  const handleAddMeal = async () => {
    try {
      if (!user) {
        toast.error(
          isId
            ? "Silakan masuk untuk menambahkan meal ke log."
            : "Please sign in to add meals to your log.",
        );
        return;
      }
      setIsAdding(true);

      await addMealLog({
        userId: user.id || user.uid,
        foodId: food.id,
        foodName: food.name,
        calories: food.calories,
        proteins: food.proteins,
        fat: food.fat,
        carbs: food.carbohydrate,
        quantity: 1,
        mealType: "meal",
      });
      // REFRESH PROFILE
      await fetchProfile(user.id || user.uid, true);

      toast.success(
        isId
          ? `${food.name} ditambahkan ke log makanan`
          : `${food.name} added to meal log`,
      );
    } catch (error) {
      console.error("❌ Failed add meal:", error);
      toast.error(
        isId ? "Gagal menambahkan log makanan." : "Failed to add meal log.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-3.5 sm:p-4 shadow-sm flex items-center gap-3.5 sm:gap-4 hover:shadow-md transition">
      {/* IMAGE */}
      <img
        src={food.image}
        alt={food.name}
        className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl object-cover bg-gray-100"
      />

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-0.5 truncate">
          {food.name}
        </h3>
        <p className="text-sm text-[#22C55E] font-bold mb-2 sm:mb-3">
          {food.calories} kcal
        </p>

        {/* MACROS */}
        <div className="flex gap-3 sm:gap-5 text-xs sm:text-sm mb-3">
          <div>
            <span className="font-bold text-gray-800">{food.proteins}g</span>
            <p className="text-gray-400 text-[10px] sm:text-xs">Protein</p>
          </div>

          <div>
            <span className="font-bold text-gray-800">
              {food.carbohydrate}g
            </span>
            <p className="text-gray-400 text-[10px] sm:text-xs">{isId ? "Karbo" : "Carbs"}</p>
          </div>

          <div>
            <span className="font-bold text-gray-800">{food.fat}g</span>
            <p className="text-gray-400 text-[10px] sm:text-xs">{isId ? "Lemak" : "Fat"}</p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddMeal}
          disabled={isAdding}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#22C55E] text-white text-xs sm:text-sm font-semibold hover:bg-[#16A34A] transition-all disabled:opacity-50"
        >
          <Plus size={14} />
          <span>
            {isAdding
              ? isId
                ? "Menambahkan..."
                : "Adding..."
              : isId
                ? "Tambah"
                : "Add"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchFoodCard;
