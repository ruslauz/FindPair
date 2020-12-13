import { changeAppState } from './appActions';


export const setPlayerName = playerName => ({
  type: 'SET_PLAYER_NAME',
  payload: playerName
});
export const setNameInputVanished = () => ({
  type: 'SET_NAME_INPUT_VANISHED',
});
export const setPlaceholder = placeholder => ({
  type: 'SET_PLACEHOLDER',
  payload: placeholder
});
export const resetNameInput = () => ({
  type: 'RESET_NAME_INPUT',
});
export const onClick = () => dispatch => {
    dispatch(setNameInputVanished())
    setTimeout(() => dispatch(changeAppState('levelInput')), 700)
  }
export const onChange = e => {
  return dispatch => {
    const value = e.target.value.trim()
    dispatch(setPlayerName(value))
  }
};
export const onFocus = e => dispatch => {
    dispatch(setPlaceholder(``))
  };
export const onBlur = e => dispatch => {
    dispatch(setPlaceholder(`Minimum 3 Symbols`))
  };
