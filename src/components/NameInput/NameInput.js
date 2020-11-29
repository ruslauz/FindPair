import {useSelector, useDispatch} from 'react-redux';
import {setPlayerName, onBlur, onFocus, setNameInputVanished} from '../../redux/actions/nameInputActions'
import {changeAppState} from '../../redux/actions/appActions'
import classes from './NameInput.module.scss';
import Input from '../Input/Input';

const NameInput = () => {
  const dispatch = useDispatch();
  const {vanished, placeholder, playerName} = useSelector(({nameInput}) => nameInput);
  const onClick = () => {
    dispatch(setNameInputVanished())
    setTimeout(() => dispatch(changeAppState('levelInput')), 700)
  }
  const onChange = e => {
    e.preventDefault()
    dispatch(setPlayerName(e.target.value.trim()))
  }
  const isButtonDisabled = playerName.length >= 3 ? false : true;
  const cls = [classes.NameInput]
  vanished && cls.push(classes.vanish)

  return (
    <div className={cls.join(' ')}>
      <fieldset>
        <legend>Identify Yourself</legend>
        <Input
        type="text"
        name="userName"
        placeholder={placeholder}
        value={playerName}
        onChange={onChange}
        onFocus={() => dispatch(onFocus())}
        onBlur={() => dispatch(onBlur())}/>
      </fieldset>
      <button onClick={onClick} disabled={isButtonDisabled}>
        Next
      </button>
    </div>
  )
}

export default NameInput