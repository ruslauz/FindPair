import {Component} from 'react';
import classes from './App.module.scss';
import Menu from './components/Menu/Menu'
import NameInput from './components/NameInput/NameInput';
import LevelInput from './components/LevelInput/LevelInput';
import Game from './components/Game/Game';
import Finish from './components/Finish/Finish';

class App extends Component {
  minimumUserNameLength = 3;
  nameInputPlaceHolder = `Minimum ${this.minimumUserNameLength} Symbols`
  settings = {
      easy: {
        numberOfCards: 20,
        rows: 4,
        columns: 5
      },
      normal: {
        numberOfCards: 24,
        rows: 4,
        columns: 6
      },
      hard: {
        numberOfCards: 30,
        rows: 5,
        columns: 6
      }
    }
  state = {
    game: 'nameInput',
    playerName: '',
    gameLevel: '',
    startButtonDisabled: true,
  }

  levelSelectHandler = e => {
    this.setState({
      gameLevel: e.target.value,
      startButtonDisabled: false,
    })
  }

  levelChangeHandler = () => {
    this.setState({
      game: 'levelInput',
      gameLevel: '',
      startButtonDisabled: true,
      score: 0,
    })
  }

  setGame = level => {
    return {...this.settings[level],
      playerName: this.state.playerName,
      levelChangeHandler: this.levelChangeHandler,
      endGameHandler: this.endGameHandler,
      finishGameHandler: this.finishGameHandler,
      saveScore: this.saveScoreHandler
    }
  }

  nameInputHandler = (e, hook) => {
    this.setState({playerName: e.target.value.trim()},
      () => this.state.playerName.length >= this.minimumUserNameLength ? hook(false) : hook(true))
  }

  nameInputFocusHandler = e => {
    e.target.placeholder = ''
  }

  nameInputBlurHandler = e => {
    e.target.placeholder = this.nameInputPlaceHolder
  }
 
  nameButtonHandler = hook => {
    hook(true)
    setTimeout(() => this.setState({game: 'levelInput'}), 700)
  }
 
  startButtonHandler = (ref, className) => {
    ref.current.classList.add(className)
    setTimeout(() => this.setState({game: 'gameStart'}), 700)
  }

  retryGameHandler = () => {
    this.setState({game: 'gameStart'})
  } 

  endGameHandler = () => {
    this.setState({
      game: 'nameInput',
      playerName: '',
      gameLevel: '',
      startButtonDisabled: true,
    })
  }

  finishGameHandler = score => {
    this.setState({
      game: 'gameFinished',
      score
    }, this.saveScore)
  }

  saveScore = () => {
    if (!localStorage.getItem('highScore') || Array.isArray(JSON.parse(localStorage.getItem('highScore')))) localStorage.setItem('highScore', JSON.stringify({}))
    const highScore = JSON.parse(localStorage.getItem('highScore'))
    const player = this.state.playerName
    const score = this.state.score
    console.log(highScore, player, score);
    highScore[player] = highScore[player] && (highScore[player] < score) ? highScore[player] : score
    localStorage.setItem('highScore', JSON.stringify(highScore))

    console.log(JSON.parse(localStorage.getItem('highScore')));
  }

  getScores = () => {

  }

  render() {
    return (
      <div className={classes.App}>
        <Menu />
        {this.state.game === 'nameInput' && <NameInput
          onClick={this.nameButtonHandler}
          onChange={this.nameInputHandler}
          nameInputValue={this.state.playerName}
          nameInputPlaceHolder={this.nameInputPlaceHolder}
          minimumUserNameLength={this.minimumUserNameLength}
          nameInputFocusHandler={this.nameInputFocusHandler}
          nameInputBlurHandler={this.nameInputBlurHandler}
        />}
        {this.state.game === 'levelInput' && <LevelInput
          levelChangeHandler={this.levelSelectHandler}
          startButtonState={this.state.startButtonDisabled}
          startButtonHandler={this.startButtonHandler}
          levels={Object.keys(this.settings)}
        />}
        {this.state.game === 'gameStart' && <Game {...this.setGame(this.state.gameLevel)}/>}
        {this.state.game === 'gameFinished' && <Finish
          score={this.state.score}
          playerName={this.state.playerName}
          level={this.state.gameLevel}
          retry={this.retryGameHandler}
          levelChangeHandler={this.levelChangeHandler}
          endGameHandler={this.endGameHandler}
        />}
      </div>
    );
  }
}

export default App;
