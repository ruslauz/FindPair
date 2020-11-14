import {useState} from 'react'
import classes from './NameInput.module.scss';
import Input from '../Input/Input';

const NameInput = props => {
  const [vanish, setVanish] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const buttonClickHandler = () => props.onClick(setVanish)
  const inputChangeHandler = e => {
    e.preventDefault()
    props.onChange(e, setButtonDisabled)
  }
  const cls = [classes.NameInput]
  vanish && cls.push(classes.vanish)

  return (
    <div className={cls.join(' ')}>
      <fieldset>
        <legend>Identify Yourself</legend>
        <Input
        type="text"
        name="userName"
        placeholder={props.nameInputPlaceHolder}
        value={props.nameInputValue}
        onChange={inputChangeHandler}
        onFocus={props.nameInputFocusHandler}
        onBlur={props.nameInputBlurHandler}
      />
      </fieldset>
      <button onClick={buttonClickHandler} disabled={buttonDisabled}>
        Next
      </button>
    </div>
  )
}

export default NameInput