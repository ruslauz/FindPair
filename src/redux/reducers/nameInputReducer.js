const initialState = {
  placeholder: `Minimum 3 Symbols`,
  playerName: '',
  vanished: false,
}

const nameInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME_INPUT_VANISHED':
      return {...state, vanished: true};
    case 'SET_PLAYER_NAME':
      return {...state, playerName: action.payload};
    case 'ON_FOCUS':
      return {...state, placeholder: ''};
    case 'ON_BLUR':
      return {...state, placeholder: initialState.placeholder};
    case 'RESET_NAME_INPUT':
      return {...initialState};
    default:
      return state;
  }
}

export default nameInputReducer;