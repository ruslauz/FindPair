import { memo } from 'react';
import {useDispatch} from 'react-redux';
import {openCard} from '../../redux/actions/gameActions';
import classes from './Card.module.scss';

const Card = ({isOpened, index, value}) => {
  const dispatch = useDispatch();
  const cls = [classes.card]
  const onClick = () => {
    !isOpened && dispatch(openCard(index, value)); 
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

export default memo(Card);