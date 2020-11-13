import classes from './Finish.module.scss'
import React, {useState} from 'react'

const Finish = props => {
  const [highScoresHidden, setHighScoresHidden] = useState(false)
  const highScores = props.arrayOfHighScores.map(score => (
                <React.Fragment key={score[0]}>
                  <div className={classes['scores__name']}>{score[0]}</div>
                  <div className={classes['scores__score']}>{score[1]}</div>
                </React.Fragment>
              ))
  const deleteScoresHandler = () => {
    props.deleteHighscoresFromLocalSorage()
    setHighScoresHidden(true)
  }

  const retryGameHandler = highScoresHidden => {
    props.retry(highScoresHidden)
  }
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
          <button onClick={retryGameHandler}>Retry</button>
          <button onClick={props.levelChangeHandler}>Change Level</button>
          <button onClick={props.endGameHandler}>End Game</button>
        </div>
        <div>
          <h2>{props.level} Level High Scores</h2>
          <div className={classes.scores}>
            {!highScoresHidden && highScores}
          </div>
        </div>
      </main>
      <footer>
        <button onClick={deleteScoresHandler}>Delete Scores</button>
      </footer>
    </div>
  )
}

export default Finish;