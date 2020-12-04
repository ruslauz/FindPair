import {memo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setPlayerName, setNameInputVanished} from '../../redux/actions/nameInputActions';
import {changeAppState} from '../../redux/actions/appActions';
import classes from './NameInput.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const NameInput = () => {
  const dispatch = useDispatch();
  const {vanished, placeholder, playerName} = useSelector(({nameInput}) => nameInput);
  const onClick = useCallback(() => {
    dispatch(setNameInputVanished())
    setTimeout(() => dispatch(changeAppState('levelInput')), 700)
  }, [dispatch]) 
  const onChange = useCallback(e => {
      e.preventDefault()
      const value = e.target.value.trim()
      value && dispatch(setPlayerName(value))
  }, [dispatch]);
  const onFocusHandler = useCallback((e) => {
      e.target.placeholder = '';
  }, []);
  const onBlurHandler = useCallback((e) => {
    e.target.placeholder = placeholder;
  }, [placeholder]);
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
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}/>
      </fieldset>
      <Button onClick={onClick} disabled={isButtonDisabled}>Next</Button>
    </div>
  )
}

export default memo(NameInput);