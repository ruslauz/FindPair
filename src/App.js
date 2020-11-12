import {Component} from 'react';
import classes from './App.module.scss';
import Menu from './components/Menu/Menu'
import NameInput from './components/NameInput/NameInput';
import LevelInput from './components/LevelInput/LevelInput';
import Game from './components/Game/Game';

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

  setGame = level => {
    return {...this.settings[level],
      playerName: this.state.playerName,
      levelChangeHandler: this.levelChangeHandler,
      endGameHandler: this.endGameHandler
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
      </div>
    );
  }
}

export default App;
