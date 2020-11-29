import {createStore, combineReducers} from 'redux';
import appReducer from '../redux/reducers/appReducer';
import nameInputReducer from '../redux/reducers/nameInputReducer';
import levelSelectionReducer from '../redux/reducers/levelSelectionReducer';
import gameReducer from '../redux/reducers/gameReducer';
import finishReducer from '../redux/reducers/finishReducer';

const rootReducer = combineReducers({
  app: appReducer,
  nameInput: nameInputReducer,
  levelSelection: levelSelectionReducer,
  game: gameReducer,
  finish: finishReducer
})

const store = createStore(rootReducer, undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;