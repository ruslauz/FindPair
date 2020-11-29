import classes from './App.module.scss';
import {useSelector} from 'react-redux';
import NameInput from '../NameInput/NameInput';
import LevelInput from '../LevelInput/LevelInput';
import Game from '../Game/Game';
import Finish from '../Finish/Finish';



const App = () => {
  const {appState} = useSelector(({app}) => app);
  return (
    <div className={classes.App}>
      {appState === 'nameInput' && <NameInput/>}
      {appState === 'levelInput' && <LevelInput/>}
      {appState === 'gameStart' && <Game/>}
      {appState === 'gameFinished' && <Finish/>}
    </div>
  );
}

export default App;
