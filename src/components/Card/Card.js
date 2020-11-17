import {useState, useEffect} from 'react';
import classes from './Card.module.scss';

const Card = props => {
  let reset = props.reset
  const [opened, setOpened] = useState(false)
  const cls = [classes.card]
  const onClick = () => {
    props.onClick(setOpened, props.card, opened)
  }

  useEffect(() => {
    setOpened(false)
  }, [reset])

  if (opened) cls.push(classes.active)

  return (
    <div
      className={classes.container}
      onClick={onClick}
      >
      <div className={cls.join(' ')}>
        <div className={classes.front} ></div>
        <div className={`${classes.back} ${classes[`back_${props.card}`]}`}></div>
      </div>
    </div>
  )
}

export default Card