import {Component} from 'react'
import classes from './Game.module.scss';
import Card from '../Card/Card';

class Game extends Component {
  numberOfCards = this.props.numberOfCards
  columns = this.props.columns
  rows = this.props.rows
  style = {gridTemplateColumns: `repeat(${this.columns}, 1fr)`, gridTemplateRows: `repeat(${this.rows}, 1fr)`}
  clickBlock = false
  state = {
    cards: this.makeRandomArrayOfCards(this.numberOfCards),
    vanish: false,
    openedCardsHooks: [],
    openedCardsNumber: 0,
    steps: 0,
    firstCardValue: null,
    secondCardValue: null,
    cardReset: false,
    leftCards: this.numberOfCards
  }

  makeRandomArrayOfCards(carsdsAmount) {
    const set1 = new Set()
    const set2 = new Set()
    const result = []

    for (let i = 0; result.length < carsdsAmount; i++){
      fillSetAndArray(set1, carsdsAmount/2, result)
      fillSetAndArray(set2, carsdsAmount/2, result)
    }

    return result

    function fillSetAndArray(set, size, array) {
      const num = Math.floor(Math.random() * (size) + 1);
      if (!set.has(num)) {
        set.add(num);
        array.push(num);
      }
    }
  }

  cardCLickHandler = (setOpened, value, isOpened) => {
    if (this.state.openedCardsHooks.length < 2 && !isOpened && !this.clickBlock) {
      setOpened(!isOpened)
      this.state.firstCardValue ? this.setState({secondCardValue: value}) : this.setState({firstCardValue: value})
      this.setState({
        openedCardsHooks: this.state.openedCardsHooks.concat(setOpened),
        openedCardsNumber: this.state.openedCardsNumber + 1
      })
    } 
  }

  resetGame = () => {
    this.clickBlock = true
    clearTimeout(this.timeout) /* This Timeout Fixes Bug With Reset Button During Opened Card Checking */
    this.setState({
      cardReset: !this.state.cardReset,
      openedCardsHooks: [],
      openedCardsNumber: 0,
      steps: 0,
      firstCardValue: null,
      secondCardValue: null,
      leftCards: this.numberOfCards,
    })
    setTimeout(() =>  {
      this.setState({cards: this.makeRandomArrayOfCards(this.numberOfCards)})
      this.clickBlock = false
    }, 500)
  }

  changeLevel = () => {
    this.setState({vanish: true},
      () => setTimeout(this.props.levelChangeHandler, 700))
  }

  endGame = () => {
     this.setState({vanish: true},
      () => setTimeout(this.props.endGameHandler, 700))
  }

  componentDidMount() {
    this.props.setHighScoresState()
  }

  componentDidUpdate() {
    if (this.state.openedCardsNumber === 2) {
      this.timeout = setTimeout(() => {
        if (this.state.firstCardValue !== this.state.secondCardValue) {
          this.state.openedCardsHooks.forEach(hook => hook(false))
        } else {
          this.setState({leftCards: this.state.leftCards - 2})
        }
        this.setState({
          steps: this.state.steps + 1,
          openedCardsHooks: [],
          secondCardValue: null,
          firstCardValue: null
        }, () => {
          if (!this.state.leftCards) {
            this.setState({vanish: true})
            setTimeout(() =>  this.props.finishGameHandler(this.state.steps), 700)
          }
        })
      }, 1000)
      this.setState({openedCardsNumber: 0})     
    }
  }

  render() {
    const cls = [classes.Game]
    if (this.state.vanish) cls.push(classes.vanish)

    return (
      <div className={cls.join(' ')}>
        <div className={classes.header}>
          <div>
            <div className={classes.player}>Player: <span>{this.props.playerName}</span></div>
            <div className={classes.steps}>Steps: <span>{this.state.steps}</span></div>
          </div>
          <div className={classes.buttons}>
            <button onClick={this.resetGame}>Reset</button>
            <button onClick={this.changeLevel}>Change Level</button>
            <button onClick={this.endGame}>End Game</button>
          </div>
        </div>
        <div className={classes.cards} style={this.style}>
          {this.state.cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                onClick={this.cardCLickHandler}
                reset={this.state.cardReset}
              />)
            )}
        </div>
      </div>
    )
  }
}

export default Game;