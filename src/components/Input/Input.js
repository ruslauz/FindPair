
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
        />
        <span>{props.LabelText}</span>
      </label>    
  )
}

export default Input