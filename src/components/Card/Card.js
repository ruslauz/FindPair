import {useSelector, useDispatch} from 'react-redux';
import {
  openCard, 
  setFirstCard, 
  setSecondCard, 
  incOpenedCardsNumber, 
  setClickBlock, 
  saveOpenedCardIndex} from '../../redux/actions/gameActions';
import classes from './Card.module.scss';

const Card = ({isOpened, index, value}) => {
  const dispatch = useDispatch();
  const {clickBlock, openedCardsNumber} = useSelector(({game}) => game)
  const cls = [classes.card]
  const onClick = () => {
    if (clickBlock || isOpened) return;
    dispatch(setClickBlock(true));
    dispatch(openCard(index));
    dispatch(saveOpenedCardIndex(index));
    dispatch(incOpenedCardsNumber());
    openedCardsNumber ? dispatch(setSecondCard(value)) : dispatch(setFirstCard(value));
  }
  if (isOpened) cls.push(classes.active)

  return (
    <div
      className={classes.container}
      onClick={onClick}>
      <div className={cls.join(' ')}>
        <div className={classes.front} />
        <div className={`${classes.back} ${classes[`back_${value}`]}`}/>
      </div>
    </div>
  )
}

// export default memo(Card);
export default Card;