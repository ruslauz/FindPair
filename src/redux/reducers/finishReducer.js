const initialState = {
  vanished: false,
}

const finishReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FINISH_VANISHED':
      return {...state, vanished: true};
    case 'RESET_FINISH':
      return {...initialState};
    default:
      return state;
  }
}

export default finishReducer;

