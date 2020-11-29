  export const setHighscoresToLocalStorage = (level, highScores) => localStorage.setItem(level, JSON.stringify(highScores))
  export const getHighscoresFromLocalSorage = level => JSON.parse(localStorage.getItem(level))
  export const deleteHighscoresFromLocalSorage = level => localStorage.removeItem(level)
