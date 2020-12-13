import {memo, useEffect, useMemo} from 'react';
import {connect, useSelector} from 'react-redux';
import {checkOpenedCards, finishGame} from '../../redux/actions/gameActions';
import Card from '../Card/Card';

const CardBoard = ({checkOpenedCards, finishGame, className}) => {
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

  useEffect(() => {
    openedCardsIndexes.length === 2 && openedCardsNumber === 2 && !timer && checkOpenedCards(firstCardValue === secondCardValue);
    leftCards === 0 && !vanished && finishGame(highScores, playerName, gameLevel, steps);
  })

  return (
    <div className={className} style={style}>
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

export default connect(undefined, {checkOpenedCards, finishGame})(memo(CardBoard));