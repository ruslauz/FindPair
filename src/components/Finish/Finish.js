import classes from './Finish.module.scss'

const Finish = props => {
  return (
    <div className={classes.Finish}>
      <header>
        <h1>Finish</h1>
      </header>
      <main>
        <div className={classes['player-highscore']}>
          <span className={classes['player-highscore__name']}>{props.playerName},</span> Your Score is <span className={classes['player-highscore__score']}>{props.score}</span> steps on <span className={classes['player-highscore__level']}>{props.level}</span> level
        </div>
        <div className={classes['action-buttons']}>
          <button onClick={props.retry}>Retry</button>
          <button onClick={props.levelChangeHandler}>Change Level</button>
          <button onClick={props.endGameHandler}>End Game</button>
        </div>
        <div>
          <h2>{props.level} Level High Scores</h2>
        </div>
      </main>
      <footer>
        <button onClick={props.deleteScore}>Delete Scores</button>
      </footer>
    </div>
  )
}

export default Finish;