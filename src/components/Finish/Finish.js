import React, { memo, useCallback } from 'react';
import {connect, useSelector} from 'react-redux';
import {setFinishVanished, onDeleteScores, onRetry} from '../../redux/actions/finishActions';
import {onChangeLevel, onEndGame} from '../../utils/sharedMethods';
import Button from '../Button/Button';
import classes from './Finish.module.scss';

const Finish = ({onDeleteScores, onRetry, level}) => {
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
          <Button onClick={onRetry}>Retry</Button>
          <Button onClick={useCallback(() => onChangeLevel(setFinishVanished), [])}>Change Level</Button>
          <Button onClick={useCallback(() => onEndGame(setFinishVanished), [])}>End Game</Button>
        </div>
        <div>
          <h2>{level} Level High Scores</h2>
          <div className={classes.scores}>
            {highScoresTable}
          </div>
        </div>
      </main>
      <footer>
        <Button onClick={useCallback(() => onDeleteScores(gameLevel), [gameLevel, onDeleteScores])}>Delete Scores</Button>
      </footer>
    </div>
  )
}

export default connect(undefined, {onDeleteScores, onRetry})(memo(Finish));