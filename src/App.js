import {Component} from 'react';
import classes from './App.module.scss';
import NameInput from './components/NameInput/NameInput';
import LevelInput from './components/LevelInput/LevelInput';
import Game from './components/Game/Game';
import Finish from './components/Finish/Finish';

class App extends Component {
  fadeOutTimout = 700
  minimumUserNameLength = 3
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
    highScores: {}
  }

 /* Handlers For Name Input Component */

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
    setTimeout(() => this.setState({game: 'levelInput'}), this.fadeOutTimout)
  }

/* Handlers For Level Input Component */

  levelSelectHandler = e => {
    this.setState({
      gameLevel: e.target.value,
      startButtonDisabled: false,
    })
  }

  startButtonHandler = (ref, className) => {
    ref.current.classList.add(className)
    setTimeout(() => this.setState({game: 'gameStart'}), this.fadeOutTimout)
  }

/* Methods and Handlers For Game Component */

  setGame = level => {
    return {...this.settings[level],
      playerName: this.state.playerName,
      levelChangeHandler: this.levelChangeHandler,
      endGameHandler: this.endGameHandler,
      finishGameHandler: this.finishGameHandler,
      setHighScoresState: this.setHighScoresState,
    }
  }

  levelChangeHandler = () => {
    this.setState({
      game: 'levelInput',
      gameLevel: '',
      startButtonDisabled: true,
      score: 0,
    })
  }

  endGameHandler = () => {
    this.setState({
      game: 'nameInput',
      playerName: '',
      gameLevel: '',
      startButtonDisabled: true,
    })
  }

  finishGameHandler = score => this.setState({score}, this.saveScoreHandler)

  setHighScoresState = () => {
    const highScores = this.getHighscoresFromLocalSorage()
    highScores ? this.setState({highScores}) :  this.setState({highScores: {}})
  }

/* Methods And Handlers For Finish Component */

  retryGameHandler = highScoresHidden => {
    highScoresHidden 
    ? this.setState({game: 'gameStart', highScores: {}})
    : this.setState({game: 'gameStart'})
  } 

  saveScoreHandler = () => {
    const highScores = this.state.highScores
    highScores[this.state.playerName] = highScores[this.state.playerName] && (highScores[this.state.playerName] < this.state.score)
    ? highScores[this.state.playerName]
    : this.state.score
    const arrayOfHighScores = Object.entries(highScores).sort((a, b) => a[1] - b[1])
    this.setState({highScores, arrayOfHighScores, game: 'gameFinished'}, this.setHighscoresToLocalStorage)
  }

/* Methods For Local Storage */

  setHighscoresToLocalStorage = () => localStorage.setItem(this.state.gameLevel, JSON.stringify(this.state.highScores))

  getHighscoresFromLocalSorage = () => JSON.parse(localStorage.getItem(this.state.gameLevel))

  deleteHighscoresFromLocalSorage = () => localStorage.removeItem(this.state.gameLevel)

  render() {
    return (
      <div className={classes.App}>
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
          arrayOfHighScores={this.state.arrayOfHighScores}
          playerName={this.state.playerName}
          level={this.state.gameLevel}
          retry={this.retryGameHandler}
          levelChangeHandler={this.levelChangeHandler}
          endGameHandler={this.endGameHandler}
          deleteHighscoresFromLocalSorage={this.deleteHighscoresFromLocalSorage}
        />}
      </div>
    );
  }
}

export default App;
