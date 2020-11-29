export const setPlayerName = playerName => ({
  type: 'SET_PLAYER_NAME',
  payload: playerName
});
export const setNameInputVanished = playerName => ({
  type: 'SET_NAME_INPUT_VANISHED',
});
export const onFocus = () => ({
  type: 'ON_FOCUS',
});
export const onBlur = () => ({
  type: 'ON_BLUR',
});
export const resetNameInput = () => ({
  type: 'RESET_NAME_INPUT',
});
