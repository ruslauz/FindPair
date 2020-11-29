import { changeAppState, setHighScores } from '../redux/actions/appActions';
import { resetFinish } from '../redux/actions/finishActions';
import { resetGame } from '../redux/actions/gameActions';
import { resetGameLevel } from '../redux/actions/levelSelectionActions';
import { resetNameInput } from '../redux/actions/nameInputActions';
import { getHighscoresFromLocalSorage } from './localStorage';

export const onChangeLevel = (setVanishedAction, dispatch) => {
  dispatch(setVanishedAction())
  setTimeout(() => {
    dispatch(resetFinish());
    dispatch(changeAppState('levelInput'));
    dispatch(resetGame());
    dispatch(resetGameLevel());
  }, 700)
}
export const onEndGame = (setVanishedAction, dispatch) => {
  dispatch(setVanishedAction())
  setTimeout(() => {
    dispatch(changeAppState('nameInput'));
    dispatch(resetFinish());
    dispatch(resetGame());
    dispatch(resetGameLevel());
    dispatch(resetNameInput());
  }, 700)
}
export const setHighScoresState = (dispatch, gameLevel) => {
  const highScores = getHighscoresFromLocalSorage(gameLevel);
  highScores ? dispatch(setHighScores(highScores)) : dispatch(setHighScores({}));
}