import { deleteHighscoresFromLocalSorage } from "../../utils/localStorage";
import { setHighScoresState } from "../../utils/sharedMethods";
import { changeAppState } from "./appActions";
import { resetProgress } from "./gameActions";

export const setFinishVanished = () => ({
  type: 'SET_FINISH_VANISHED',
});
export const resetFinish = () => ({
  type: 'RESET_FINISH',
});
export const onDeleteScores = gameLevel => dispatch => {
    deleteHighscoresFromLocalSorage(gameLevel);
    setHighScoresState(gameLevel);
  }; 
export const onRetry = () => dispatch => {
  dispatch(setFinishVanished())
  setTimeout(() => {
    dispatch(changeAppState('gameStart'))
    dispatch(resetFinish())
    dispatch(resetProgress());
  }, 700)
};
