import {memo} from 'react';

const Input = props => {

  return (
      <label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          ref={props.inputRef}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          autoComplete="off"/>
        <span>{props.LabelText}</span>
      </label>    
  )
}

export default memo(Input);