const calculateUserStatus = (weight, height) => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);

  if (bmi < 18.5) return "Insufficient_Weight";
  if (bmi < 25) return "Normal_Weight";
  if (bmi < 27.5) return "Overweight_Level_I";
  if (bmi < 30) return "Overweight_Level_II";
  if (bmi < 35) return "Obesity_Type_I";
  if (bmi < 40) return "Obesity_Type_II";
  return "Obesity_Type_III";
};

module.exports = { calculateUserStatus };
