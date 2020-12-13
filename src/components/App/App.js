import classes from './App.module.scss';
import {useSelector} from 'react-redux';
import NameInput from '../NameInput/NameInput';
import LevelInput from '../LevelInput/LevelInput';
import Game from '../Game/Game';
import Finish from '../Finish/Finish';
import { memo } from 'react';

const appStates = {
  nameInput : <NameInput/>,
  levelInput: <LevelInput/>,
  gameStart: <Game/>,
  gameFinished: <Finish/>,
}

const App = () => {
  const appState = useSelector(({app}) => app.appState);
  return (
    <div className={classes.App}>
      {appStates[appState]}
    </div>
  );
}

export default memo(App);
