import {} from '../../utils/localStorage';

const initialState = {
  appState: 'nameInput',
  fadeOutTimout: 700,
  highScores: null,
  score: 0,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_APP_STATE':
      return {...state, appState: action.payload};
    case 'SET_HIGHSCORES':
      return {...state, highScores: action.payload};
    case 'SET_SCORE':
      return {...state, score: action.payload};
    case 'RESET_APP':
      return {...initialState};
    default:
      return state;
  }
}

export default appReducer;