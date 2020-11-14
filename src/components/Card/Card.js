import {useState, useEffect} from 'react';
import classes from './Card.module.scss';
import cover from '../../images/cover/cover.svg'

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
      <div className={cls.join(' ')} data-value={props.card}>
        <div className={classes.front} style={{background: `url(${cover}) no-repeat center center/50%`}}></div>
        <div className={classes.back}>{props.card}</div>
      </div>
    </div>
  )
}

export default Card