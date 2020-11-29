const initialState = {
  gameLevel: '',
  vanished: false,
}

const levelSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEVEL_SELECTION_VANISHED':
      return {...state, vanished: true};
    case 'CHANGE_GAME_LEVEL':
      return {...state, gameLevel: action.payload};
    case 'RESET_GAME_LEVEL':
      return {...initialState};
    default:
      return state;
  }
}

export default levelSelectionReducer;