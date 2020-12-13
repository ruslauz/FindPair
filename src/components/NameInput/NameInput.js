import {memo} from 'react';
import {useSelector, connect} from 'react-redux';
import * as actions from '../../redux/actions/nameInputActions';
import classes from './NameInput.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const NameInput = ({onClick, onChange, onFocus, onBlur}) => {
  const vanished = useSelector(({nameInput}) => nameInput.vanished);
  const placeholder = useSelector(({nameInput}) => nameInput.placeholder);
  const playerName = useSelector(({nameInput}) => nameInput.playerName);
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
          onFocus={onFocus}
          onBlur={onBlur}/>
      </fieldset>
      <Button onClick={onClick} disabled={isButtonDisabled}>Next</Button>
      {console.log('name-input')}
    </div>
  )
}

export default connect(undefined, actions)(memo(NameInput));

