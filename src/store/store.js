import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
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

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)));


export default store;