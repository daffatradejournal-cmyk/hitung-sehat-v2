const normalizeScore = (score) => {
  const numericScore = Number(score);

  // invalid score fallback
  if (Number.isNaN(numericScore)) {
    return 50;
  }

  // clamp score
  const clampedScore = Math.max(50, Math.min(98, Math.round(numericScore)));

  return clampedScore;
};

const getScoreLabel = (score) => {
  if (score >= 90) {
    return "Excellent Match";
  }

  if (score >= 75) {
    return "Good Match";
  }

  if (score >= 60) {
    return "Fair Match";
  }

  return "Low Match";
};

module.exports = {
  normalizeScore,
  getScoreLabel,
};
