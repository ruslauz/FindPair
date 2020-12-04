import classes from './App.module.scss';
import {useSelector} from 'react-redux';
import NameInput from '../NameInput/NameInput';
import LevelInput from '../LevelInput/LevelInput';
import Game from '../Game/Game';
import Finish from '../Finish/Finish';
import { memo } from 'react';



const App = () => {
  const appState = useSelector(({app}) => app.appState);
  return (
    <div className={classes.App}>
      {console.log('app')}
      {appState === 'nameInput' && <NameInput/>}
      {appState === 'levelInput' && <LevelInput/>}
      {appState === 'gameStart' && <Game/>}
      {appState === 'gameFinished' && <Finish/>}
    </div>
  );
}

export default memo(App);
