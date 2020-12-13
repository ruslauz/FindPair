export const setLevelSelectionVanished = () => ({
  type: 'SET_LEVEL_SELECTION_VANISHED',
});
export const changeGameLevel = level => ({
  type: 'CHANGE_GAME_LEVEL',
  payload: level
});
export const resetGameLevel = () => ({
  type: 'RESET_GAME_LEVEL',
});

export const onChange = e => dispatch => {
    dispatch(changeGameLevel(e.target.value))
  };