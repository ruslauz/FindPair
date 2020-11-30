import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {deleteHighscoresFromLocalSorage} from '../../utils/localStorage';
import {changeAppState} from '../../redux/actions/appActions';
import { resetGame } from '../../redux/actions/gameActions';
import {setFinishVanished, resetFinish} from '../../redux/actions/finishActions';
import {onChangeLevel, onEndGame, setHighScoresState} from '../../utils/sharedMethods';
import classes from './Finish.module.scss';

const Finish = (props) => {
  const dispatch = useDispatch();
  const {highScores} = useSelector(({app}) => app);
  const {playerName} = useSelector(({nameInput}) => nameInput);
  const {gameLevel} = useSelector(({levelSelection}) => levelSelection);
  const {steps} = useSelector(({game}) => game);
  const {vanished} = useSelector(({finish}) => finish);
  const cls = [classes.Finish]
  const arrayOfHighScores = Object.entries(highScores).sort((a, b) => a[1] - b[1])
  const highScoresTable = arrayOfHighScores.map(score => (
                <React.Fragment key={score[0]}>
                  <div className={classes['scores__name']}>{score[0]}</div>
                  <div className={classes['scores__score']}>{score[1]}</div>
                </React.Fragment>
              ))

  const onDeleteScores = () => {
    deleteHighscoresFromLocalSorage(gameLevel);
    setHighScoresState(dispatch, gameLevel);
  }
  const onRetry = () => {
    dispatch(setFinishVanished())
    setTimeout(() => {
      dispatch(changeAppState('gameStart'))
      dispatch(resetFinish())
      dispatch(resetGame());
    }, 700)
  }

  if (vanished) {
    cls.push(classes.vanish)
  }

  return (
    <div className={cls.join(' ')}>
      <header>
        <h1>Finish</h1>
      </header>
      <main>
        <div className={classes['player-highscore']}>
          <span className={classes['player-highscore__name']}>{playerName},</span> Your Score is <span className={classes['player-highscore__score']}>{steps}</span> steps on <span className={classes['player-highscore__level']}>{gameLevel}</span> level
        </div>
        <div className={classes['action-buttons']}>
          <button onClick={onRetry}>Retry</button>
          <button onClick={() => onChangeLevel(setFinishVanished, dispatch)}>Change Level</button>
          <button onClick={() => onEndGame(setFinishVanished, dispatch)}>End Game</button>
        </div>
        <div>
          <h2>{props.level} Level High Scores</h2>
          <div className={classes.scores}>
            {highScoresTable}
          </div>
        </div>
      </main>
      <footer>
        <button onClick={onDeleteScores}>Delete Scores</button>
      </footer>
    </div>
  )
}

export default Finish;