import {makeRandomArrayOfCards} from '../../utils/settings';

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
      if (state.numberOfCards) return {...state}
      const {numberOfCards, rows, columns} = action.payload;
      return {...state, numberOfCards, rows, columns, leftCards: numberOfCards};
    case 'DEC_LEFT_CARDS':
      return {...state, leftCards: state.leftCards - 2};
    case 'SET_CARDS':
      state.cards.push(...makeRandomArrayOfCards(state.numberOfCards));
      return {...state};
    case 'OPEN_CARD':
      const {index, value} = action.payload;
      return state.clickBlock 
        ? {...state} 
        : {...state, 
            cards: (state.cards[index].isOpened = true, state.cards),
            openedCardsIndexes: (state.openedCardsIndexes.push(index), state.openedCardsIndexes)  ,
            openedCardsNumber: state.openedCardsNumber + 1,
            ...(state.firstCardValue ? {secondCardValue: value} : {firstCardValue: value})
          };
    case 'CLOSE_CARDS':
      return {...state, cards: (state.cards.forEach(card => {
        (card.id === state.openedCardsIndexes[0] || card.id === state.openedCardsIndexes[1])
        && (card.isOpened = false)
      }), state.cards)};
    case 'CLOSE_ALL_CARDS':
      return {...state, cards: (state.cards.forEach(card => card.isOpened = false), state.cards)};
    case 'SET_FIRST_CARD':
      return {...state, firstCardValue: action.payload};
    case 'SET_SECOND_CARD':
      return {...state, secondCardValue: action.payload};
    case 'INC_STEP':
      return {...state, steps: state.steps + 1};
    case 'RESET_OPENED_CARDS_NUMBER':
      return {...state, openedCardsNumber: null};
    case 'SET_CLICK_BLOCK':
      return {...state, clickBlock: action.payload};
    case 'SET_TIMER':
      return {...state, timer: action.payload};
    case 'RESET_OPENED_CARD_INDEX':
      return {...state, openedCardsIndexes: []};
    case 'SET_GAME_VANISHED':
      return {...state, vanished: true};
    case 'RESET_PROGRESS':
      state.cards.length = 0;
      state.cards.push(...makeRandomArrayOfCards(state.numberOfCards));
      return {...initialState, 
        openedCardsIndexes: (state.openedCardsIndexes.length = 0, state.openedCardsIndexes),
        cards: state.cards, 
        numberOfCards: state.numberOfCards, 
        leftCards: state.numberOfCards,
        rows: state.rows, 
        columns: state.columns};
    case 'RESET_GAME':
      return {...initialState,
        cards: [],
        openedCardsIndexes: [],
        };
    default:
      return state;
  }
}

export default gameReducer;