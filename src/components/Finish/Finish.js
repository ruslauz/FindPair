import classes from './Finish.module.scss'

const Finish = props => {
  return (
    <div className={classes.Finish}>
      <h1>Finish</h1>
      <div>Your Score is {props.score} steps</div>
      <div>High Scores:</div>
      <button>Delete Scores</button>
    </div>
  )
}

export default Finish;