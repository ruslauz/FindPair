export const changeAppState = newState => ({
  type: 'CHANGE_APP_STATE',
  payload: newState
})
export const setHighScores = highScores => ({
  type: 'SET_HIGHSCORES',
  payload: highScores
})
export const resetApp = () => ({
  type: 'RESET_APP'
});

