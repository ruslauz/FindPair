import {batch} from 'react-redux';
import store from '../store/store';
import { changeAppState, setHighScores } from '../redux/actions/appActions';
import { resetFinish } from '../redux/actions/finishActions';
import { resetGame } from '../redux/actions/gameActions';
import { resetGameLevel } from '../redux/actions/levelSelectionActions';
import { resetNameInput } from '../redux/actions/nameInputActions';
import { getHighscoresFromLocalSorage } from './localStorage';

const {dispatch} = store;
export const onChangeLevel = (setVanishedAction) => {
  dispatch(setVanishedAction())
  setTimeout(() => {
    batch(() => {
      dispatch(resetFinish());
      dispatch(resetGame());
      dispatch(resetGameLevel());
      dispatch(changeAppState('levelInput'));
    })
  }, 700)
}
export const onEndGame = (setVanishedAction) => {
  dispatch(setVanishedAction())
  setTimeout(() => {
    batch(() => {
      dispatch(changeAppState('nameInput'));
      dispatch(resetFinish());
      dispatch(resetGame());
      dispatch(resetGameLevel());
      dispatch(resetNameInput());
    })
  }, 700)
}
export const setHighScoresState = (gameLevel) => {
  const highScores = getHighscoresFromLocalSorage(gameLevel);
  highScores ? dispatch(setHighScores(highScores)) : dispatch(setHighScores({}));
}