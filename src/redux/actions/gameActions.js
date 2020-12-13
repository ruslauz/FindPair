import { setHighscoresToLocalStorage } from "../../utils/localStorage";
import { changeAppState, setHighScores } from "./appActions";

export const setGame = settings => ({
  type: 'SET_GAME',
  payload: settings
});
export const decLeftCards = () => ({
  type: 'DEC_LEFT_CARDS',
});
export const setCards = cards => ({
  type: 'SET_CARDS',
  payload: cards
});
export const openCard = (index, value) => ({
  type: 'OPEN_CARD',
  payload: {index, value}
});
export const closeCards = () => ({
  type: 'CLOSE_CARDS',
});
export const closeAllCards = () => ({
  type: 'CLOSE_ALL_CARDS',
});
export const setFirstCard = value => ({
  type: 'SET_FIRST_CARD',
  payload: value
});
export const setSecondCard = value => ({
  type: 'SET_SECOND_CARD',
  payload: value
});
export const incStep = () => ({
  type: 'INC_STEP',
});
export const resetOpenedCardsNumber = () => ({
  type: 'RESET_OPENED_CARDS_NUMBER',
});
export const resetOpenedCardIndex = () => ({
  type: 'RESET_OPENED_CARD_INDEX',
});
export const setGameVanished = () => ({
  type: 'SET_GAME_VANISHED',
});
export const resetProgress = () => ({
  type: 'RESET_PROGRESS',
});
export const resetGame = () => ({
  type: 'RESET_GAME',
});
export const setClickBlock = value => ({
  type: 'SET_CLICK_BLOCK',
  payload: value
});
export const setTimer = timer => ({
  type: 'SET_TIMER',
  payload: timer
});
export const onResetGame = () => dispatch => {
    const timer = setTimeout(() => {
      dispatch(resetProgress());
    }, 700);
    dispatch(setTimer(timer))
    dispatch(setClickBlock(true));
    dispatch(closeAllCards());
  };
export const checkOpenedCards = equal => dispatch => {
    dispatch(setClickBlock(true))
    dispatch(incStep());
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    dispatch(resetOpenedCardsNumber());

    setTimeout(() => {
      equal && dispatch(decLeftCards());
      !equal && dispatch(closeCards());
      dispatch(resetOpenedCardIndex()); 
      dispatch(setClickBlock(false));
    }, 700)
  }
  export const finishGame = (score, playerName, gameLevel, steps) => dispatch => {
    const highScores = {...score};
    highScores[playerName] = highScores[playerName] && (highScores[playerName] < steps)
    ? highScores[playerName]
    : steps
    dispatch(setHighScores(highScores));
    setHighscoresToLocalStorage(gameLevel ,highScores);
    dispatch(setGameVanished());
    setTimeout(() => {
      dispatch(changeAppState('gameFinished'))
    }, 700)
  }

