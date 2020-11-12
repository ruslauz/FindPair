import {createRef} from 'react'
import classes from './LevelInput.module.scss'
import Input from '../Input/Input'

const LevelInput = props => {
  const elemRef = createRef();
  const onClick  = () => props.startButtonHandler(elemRef, classes.vanish)

  return (
    <div className={classes.LevelInput} ref={elemRef}>
      <fieldset>
        <legend>Choose Your Destiny</legend>
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