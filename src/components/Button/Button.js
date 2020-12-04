import {memo} from 'react';

const Button = memo(props => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  )
});

export default memo(Button);