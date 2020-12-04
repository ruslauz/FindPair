import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeAppState, setHighScores} from '../../redux/actions/appActions';
import {
  setClickBlock, 
  setFirstCard, 
  setSecondCard,
  setGameVanished,
  incStep,
  decLeftCards,
  closeCards,
  resetOpenedCardsNumber, 
  resetOpenedCardIndex} from '../../redux/actions/gameActions';
import {setHighscoresToLocalStorage} from '../../utils/localStorage';
import Card from '../Card/Card';

const CardBoard = props => {
  const dispatch = useDispatch();
  const highScores = useSelector(({app}) => app.highScores);
  const playerName = useSelector(({nameInput}) => nameInput.playerName);
  const gameLevel = useSelector(({levelSelection}) => levelSelection.gameLevel);
  const vanished = useSelector(({game}) => game.vanished);
  const steps = useSelector(({game}) => game.steps);
  const cards = useSelector(({game}) => game.cards);
  const leftCards = useSelector(({game}) => game.leftCards);
  const openedCardsNumber = useSelector(({game}) => game.openedCardsNumber);
  const firstCardValue = useSelector(({game}) => game.firstCardValue);
  const secondCardValue = useSelector(({game}) => game.secondCardValue);
  const openedCardsIndexes = useSelector(({game}) => game.openedCardsIndexes);
  const columns = useSelector(({game}) => game.columns);
  const rows = useSelector(({game}) => game.rows);
  const timer = useSelector(({game}) => game.timer);
  const style = useMemo(() => {
    return {gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}
  }, [columns, rows]);
  
  const checkOpenedCards = equal => {
    dispatch(setClickBlock(true))
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

  useEffect(() => {
    openedCardsIndexes.length === 2 && openedCardsNumber === 2 && !timer && checkOpenedCards(firstCardValue === secondCardValue);
    leftCards === 0 && !vanished && finishGame(highScores);
  })

  return (
    <div className={props.className} style={style}>
      {cards.map(({id, isOpened, value}, index) => (
        <Card
          key={id}
          index={index}
          value={value}
          isOpened={isOpened}/>)
        )}
    </div>
  )
}

export default memo(CardBoard);