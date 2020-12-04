import {memo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  resetProgress, 
  setClickBlock, 
  setGameVanished,
  closeAllCards, 
  setTimer} from '../../redux/actions/gameActions';
import classes from './Game.module.scss';
import GameInfo from '../GameInfo/GameInfo';
import CardBoard from '../CardBoard/CardBoard';
import Button from '../Button/Button';
import {onChangeLevel, onEndGame} from '../../utils/sharedMethods';

const Game = () => {
  const dispatch = useDispatch();
  const vanished = useSelector(({game}) => game.vanished);

  const onResetGame = useCallback(() => {
    const timer = setTimeout(() => {
      dispatch(resetProgress());
    }, 700);
    dispatch(setTimer(timer))
    dispatch(setClickBlock(true));
    dispatch(closeAllCards());
  }, [dispatch]); 

  const cls = [classes.Game]

  if (vanished) cls.push(classes.vanish)
  
  return (
    <div className={cls.join(' ')}>
      <div className={classes.header}>
        <GameInfo classes={classes} />
        <div className={classes.buttons}>
          <Button onClick={onResetGame}>Reset</Button>
          <Button onClick={useCallback(() => onChangeLevel(setGameVanished), [])}>Change Level</Button>
          <Button onClick={useCallback(() => onEndGame(setGameVanished), [])}>End Game</Button>
        </div>
      </div>
      <CardBoard className={classes.cards} />
    </div>
  )
}

export default memo(Game);