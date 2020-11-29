import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {settings} from '../../utils/settings';
import {setHighscoresToLocalStorage} from '../../utils/localStorage';
import {changeAppState, setHighScores} from '../../redux/actions/appActions';
import {
  setGame,
  setCards, 
  setClickBlock, 
  setFirstCard, 
  setSecondCard,
  setGameVanished,
  incStep,
  decLeftCards,
  closeCards,
  closeAllCards, 
  resetOpenedCardsNumber, 
  resetOpenedCardIndex, 
  resetGame,
  setTimer} from '../../redux/actions/gameActions';
import classes from './Game.module.scss';
import Card from '../Card/Card';
import {onChangeLevel, onEndGame} from '../../utils/sharedMethods';

const Game = () => {
  const dispatch = useDispatch();
  const {highScores} = useSelector(({app}) => app);
  const {playerName} = useSelector(({nameInput}) => nameInput);
  const {gameLevel} = useSelector(({levelSelection}) => levelSelection);
  const {
    vanished, 
    steps, 
    cards, 
    leftCards, 
    openedCardsNumber, 
    firstCardValue, 
    secondCardValue,
    clickBlock,
    openedCardsIndexes, numberOfCards, columns, rows, timer} = useSelector(({game}) => game);
  const style = {gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`};
  
  const checkOpenedCards = equal => {
    dispatch(incStep());
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    dispatch(resetOpenedCardsNumber());

    setTimeout(() => {
      equal && dispatch(decLeftCards());
      !equal && dispatch(closeCards());
      dispatch(resetOpenedCardIndex()); 
      dispatch(setClickBlock(false));
    }, 700)
  }
 
  const onResetGame = () => {
    const timer = setTimeout(() => {
      dispatch(resetGame());
      dispatch(setClickBlock(false));
      dispatch(setTimer(null))
    }, 700);
    dispatch(setTimer(timer))
    dispatch(setClickBlock(true));
    dispatch(closeAllCards());
  }

  const finishGame = score => {
    const highScores = {...score};
    highScores[playerName] = highScores[playerName] && (highScores[playerName] < steps)
    ? highScores[playerName]
    : steps
    dispatch(setHighScores(highScores));
    setHighscoresToLocalStorage(gameLevel ,highScores)
    dispatch(setGameVanished());
    setTimeout(() => {
      dispatch(changeAppState('gameFinished'))
    }, 700)
  }

  const cls = [classes.Game]

  useEffect(() => {
    openedCardsIndexes.length === 2 && openedCardsNumber === 2 && !timer && checkOpenedCards(firstCardValue === secondCardValue);
    openedCardsIndexes.length < 2 && clickBlock && dispatch(setClickBlock(false));
    leftCards === 0 && !vanished && finishGame(highScores);
  })

  useEffect(() => {
      dispatch(setGame(settings[gameLevel]))
      dispatch(setCards())
  }, [dispatch, numberOfCards, gameLevel])

  if (vanished) cls.push(classes.vanish)
  
  return (
    <div className={cls.join(' ')}>
      <div className={classes.header}>
        <div>
          <div className={classes.player}>Player: <span>{playerName}</span></div>
          <div className={classes.steps}>Steps: <span>{steps}</span></div>
        </div>
        <div className={classes.buttons}>
          <button onClick={onResetGame}>Reset</button>
          <button onClick={() => onChangeLevel(setGameVanished, dispatch)}>Change Level</button>
          <button onClick={() => onEndGame(setGameVanished, dispatch)}>End Game</button>
        </div>
      </div>
      <div className={classes.cards} style={style}>
        {cards.map(({id, isOpened, value}, index) => (
          <Card
            key={id}
            index={index}
            value={value}
            isOpened={isOpened}/>)
          )}
      </div>
    </div>
  )
}

export default Game;