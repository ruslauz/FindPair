import {makeRandomArrayOfCards} from '../../utils/settings';

// const {numberOfCards, columns, rows} = settings[gameLevel];
const initialState = {
  vanished: false,
  cards: [],
  openedCardsIndexes: [],
  openedCardsNumber: 0,
  steps: 0,
  firstCardValue: null,
  secondCardValue: null,
  numberOfCards: null,
  rows: null, 
  columns: null,
  leftCards: null,
  clickBlock: false,
  timer: null,
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GAME':
      const {numberOfCards, rows, columns} = action.payload;
      return {...state, numberOfCards, rows, columns, leftCards: numberOfCards};
    case 'DEC_LEFT_CARDS':
      return {...state, leftCards: state.leftCards - 2};
    case 'SET_CARDS':
      const cards = makeRandomArrayOfCards(state.numberOfCards).map((card, idx) => ({id: idx, value: card, isOpened: false}))
      return {...state, cards};
    case 'OPEN_CARD':
      return {...state, cards: state.cards.map(card => card.id !== action.payload ? card : (card.isOpened = true, card))};
    case 'CLOSE_CARDS':
      return {...state, cards: state.cards.map(card => {
        return (card.id === state.openedCardsIndexes[0] || card.id === state.openedCardsIndexes[1])
        ? (card.isOpened = false, card)
        : card
      })};
    case 'CLOSE_ALL_CARDS':
      return {...state, cards: state.cards.map(card => (card.isOpened = false, card))};
    case 'SET_FIRST_CARD':
      return {...state, firstCardValue: action.payload};
    case 'SET_SECOND_CARD':
      return {...state, secondCardValue: action.payload};
    case 'INC_STEP':
      return {...state, steps: state.steps + 1};
    case 'INC_OPENED_CARDS_NUMBER':
      return {...state, openedCardsNumber: state.openedCardsNumber + 1};
    case 'RESET_OPENED_CARDS_NUMBER':
      return {...state, openedCardsNumber: null};
    case 'SET_CLICK_BLOCK':
      return {...state, clickBlock: action.payload};
    case 'SET_TIMER':
      return {...state, timer: action.payload};
    case 'SAVE_OPENED_CARD_INDEX':
      return {...state, openedCardsIndexes: [...state.openedCardsIndexes, action.payload]};
    case 'RESET_STEP':
      return {...state, steps: 0};
    case 'RESET_OPENED_CARD_INDEX':
      return {...state, openedCardsIndexes: []};
    case 'SET_GAME_VANISHED':
      return {...state, vanished: true};
    case 'RESET_GAME':
      return {...initialState};
    default:
      return state;
  }
}

export default gameReducer;