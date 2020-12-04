import { memo } from 'react';
import { useSelector } from 'react-redux';

const GameInfo = ({classes}) => {
  const playerName = useSelector(({nameInput}) => nameInput.playerName);
  const steps = useSelector(({game}) => game.steps);

  return (
    <>
      <div className={classes.player}>Player: <span>{playerName}</span></div>
      <div className={classes.steps}>Steps: <span>{steps}</span></div>
    </>
  )
}

export default memo(GameInfo);