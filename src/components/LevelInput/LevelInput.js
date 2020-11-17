import {useState} from 'react'
import classes from './LevelInput.module.scss'
import Input from '../Input/Input'

const LevelInput = props => {
  const [vanish, setVanish] = useState(false)
  const onClick  = () => props.startButtonHandler(setVanish)
  const cls = [classes.LevelInput]
  vanish && cls.push(classes.vanish)

  return (
    <div className={cls.join(' ')}>
      <fieldset>
        <legend>What's Your Level</legend>
        {props.levels.map(level => (
          <Input
            key={level}
            type={"radio"}
            name={"level"}
            value={level}
            LabelText={level}
            onChange={props.levelChangeHandler}
          />
        ))}          
      </fieldset>
      <button
      onClick={onClick}
      disabled={props.startButtonState}
      >
        Start Game
      </button>
    </div>
  )
}

export default LevelInput