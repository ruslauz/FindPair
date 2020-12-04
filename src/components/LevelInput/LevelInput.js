import {useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {settings} from '../../utils/settings';
import {changeAppState} from '../../redux/actions/appActions';
import {changeGameLevel, setLevelSelectionVanished} from '../../redux/actions/levelSelectionActions';
import {setCards, setGame} from '../../redux/actions/gameActions';
import {setHighScoresState} from '../../utils/sharedMethods';
import classes from './LevelInput.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const LevelInput = () => {
  const levels = Object.keys(settings)
  const dispatch = useDispatch();
  const {vanished, gameLevel} = useSelector(({levelSelection}) => levelSelection);

  /* Трюк - onClick будет закеширован, даже если значение `gameLevel` изменится */
  const gameLevelRef = useRef();
  useEffect(() => {
    gameLevelRef.current = gameLevel
  }, [gameLevel])
  const onClick = useCallback(() => {
    const gameLevel = gameLevelRef.current
    setHighScoresState(gameLevel);
    dispatch(setLevelSelectionVanished());
    setTimeout(() => {
      dispatch(setGame(settings[gameLevel]))
      dispatch(setCards())
      dispatch(changeAppState('gameStart'))
    }, 700);
  }, [dispatch, gameLevelRef])

  const onChange = useCallback(e => {
    dispatch(changeGameLevel(e.target.value))
  }, [dispatch])

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
      <Button 
        onClick={onClick}
        disabled={isButtonDisabled}>
        Start Game
      </Button>
    </div>
  )
}

export default LevelInput