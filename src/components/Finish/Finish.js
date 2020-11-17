import classes from './Finish.module.scss'
import React, {useState} from 'react'

const Finish = props => {
  const [vanish, setVanish] = useState(false)
  const [highScoresHidden, setHighScoresHidden] = useState(false)
  const cls = [classes.Finish]
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
    setVanish(true)
    setTimeout(() => props.retry(highScoresHidden), 700)
  }

  const actionButtonClickHandler = handler => {
    setVanish(true)
    setTimeout(handler, 700)
  }

  if (vanish) {
    cls.push(classes.vanish)
  }

  return (
    <div className={cls.join(' ')}>
      <header>
        <h1>Finish</h1>
      </header>
      <main>
        <div className={classes['player-highscore']}>
          <span className={classes['player-highscore__name']}>{props.playerName},</span> Your Score is <span className={classes['player-highscore__score']}>{props.score}</span> steps on <span className={classes['player-highscore__level']}>{props.level}</span> level
        </div>
        <div className={classes['action-buttons']}>
          <button onClick={retryGameHandler}>Retry</button>
          <button onClick={() => actionButtonClickHandler(props.levelChangeHandler)}>Change Level</button>
          <button onClick={() => actionButtonClickHandler(props.endGameHandler)}>End Game</button>
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