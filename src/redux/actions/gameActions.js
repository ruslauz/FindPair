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
export const openCard = index => ({
  type: 'OPEN_CARD',
  payload: index
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
export const incOpenedCardsNumber = () => ({
  type: 'INC_OPENED_CARDS_NUMBER',
});
export const saveOpenedCardIndex = index => ({
  type: 'SAVE_OPENED_CARD_INDEX',
  payload: index
});
export const resetStep = () => ({
  type: 'RESET_STEP',
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

