import {useSelector, useDispatch} from 'react-redux';
import {settings} from '../../utils/settings';
import {changeAppState} from '../../redux/actions/appActions';
import {changeGameLevel, setLevelSelectionVanished} from '../../redux/actions/levelSelectionActions';
import {setGame} from '../../redux/actions/gameActions';
import {setHighScoresState} from '../../utils/sharedMethods';
import classes from './LevelInput.module.scss';
import Input from '../Input/Input';

const LevelInput = () => {
  const levels = Object.keys(settings)
  const dispatch = useDispatch();
  const {vanished, gameLevel} = useSelector(({levelSelection}) => levelSelection);
  const onClick  = () => {
    setHighScoresState(dispatch, gameLevel);
    dispatch(setLevelSelectionVanished());
    setTimeout(() => {
      dispatch(setGame(settings[gameLevel]))
      dispatch(changeAppState('gameStart'))
    }, 700);
  }
  const onChange = e => {
    dispatch(changeGameLevel(e.target.value))
  }
  const isButtonDisabled = !gameLevel;
  const cls = [classes.LevelInput];

  vanished && cls.push(classes.vanish);

  return (
    <div className={cls.join(' ')}>
      <fieldset>
        <legend>What's Your Level</legend>
        {levels.map(level => (
          <Input
            key={level}
            type={"radio"}
            name={"level"}
            value={level}
            LabelText={level}
            onChange={onChange}/>
        ))}          
      </fieldset>
      <button
      onClick={onClick}
      disabled={isButtonDisabled}>
        Start Game
      </button>
    </div>
  )
}

export default LevelInput