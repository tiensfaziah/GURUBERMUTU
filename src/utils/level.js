export const getLevel = (xp) => {

  if (xp < 500) {
    return {
      level: 1,
      name: "Guru Pemula",
      currentXP: 0,
      nextXP: 500,
    };
  }

  if (xp < 1500) {
    return {
      level: 2,
      name: "Guru Berkembang",
      currentXP: 500,
      nextXP: 1500,
    };
  }

  if (xp < 3000) {
    return {
      level: 3,
      name: "Guru Kreatif",
      currentXP: 1500,
      nextXP: 3000,
    };
  }

  if (xp < 5000) {
    return {
      level: 4,
      name: "Guru Produktif",
      currentXP: 3000,
      nextXP: 5000,
    };
  }

  return {
    level: 5,
    name: "Guru Inspiratif",
    currentXP: 5000,
    nextXP: 8000,
  };

};