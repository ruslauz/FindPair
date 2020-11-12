import {Component} from 'react'
import classes from './Game.module.scss';
import Card from '../Card/Card';


class Game extends Component {

  numberOfCards = this.props.numberOfCards;
  columns = this.props.columns;
  rows = this.props.rows;
  cardCLickHandler = this.cardCLickHandler.bind(this)
  style = {gridTemplateColumns: `repeat(${this.columns}, 1fr)`, gridTemplateRows: `repeat(${this.rows}, 1fr)`};
  cards = this.makeRandomArrayOfCards(this.numberOfCards)
  state = {
    openedCardsHooks: [],
    openedCardsNumber: 0,
    steps: 0,
    firstCardValue: null,
    secondCardValue: null,
    cardReset: false,
  }

  makeRandomArrayOfCards(carsdsAmount) {
    const set1 = new Set()
    const set2 = new Set()
    const result = []

    for (let i = 0; result.length < carsdsAmount; i++){
      fillSetAndArray(set1, carsdsAmount/2, result)
      fillSetAndArray(set2, carsdsAmount/2, result)
      // let num1 = Math.floor(Math.random() * (carsdsAmount/2) + 1);
      // let num2 = Math.floor(Math.random() * (carsdsAmount/2) + 1);
      // if (!set1.has(num1)) {
      //   set1.add(num1)
      //   result.push(num1)
      // }
      // if (!set2.has(num2)) {
      //   set2.add(num2)
      //   result.push(num2)
      // }
    }

    return result

    function fillSetAndArray(set, size, array) {
      let num = Math.floor(Math.random() * (size) + 1);
      if (!set.has(num)) {
        set.add(num);
        array.push(num);
      }
    }
  }

  cardCLickHandler(hook, value, state){
    if (this.state.openedCardsHooks.length < 2 && !state) {
      this.state.firstCardValue ? this.setState({secondCardValue: value}) : this.setState({firstCardValue: value})
      hook(true)
      this.setState({
        openedCardsHooks: this.state.openedCardsHooks.concat(hook),
        openedCardsNumber: this.state.openedCardsNumber + 1
      })
    } 
  }

  componentDidUpdate() {
    if (this.state.openedCardsNumber === 2) {
      setTimeout(() => {
        if (this.state.firstCardValue !== this.state.secondCardValue) this.state.openedCardsHooks.forEach(hook => hook(false))
        this.setState({
          steps: this.state.steps + 1,
          openedCardsHooks: [],
          secondCardValue: null,
          firstCardValue: null
        })
      }, 1000)
      this.setState({
        openedCardsNumber: 0
      })     
    }
  }


  resetGame = () => {
    this.setState({
      cardReset: !this.state.cardReset,
      openedCardsHooks: [],
      openedCardsNumber: 0,
      steps: 0,
      firstCardValue: null,
      secondCardValue: null,
    },
      () => {this.cards = this.makeRandomArrayOfCards(this.numberOfCards)})
  }

  saveScore = () => {
    localStorage.setItem('highScore', [])
  }

  render() {
    return (
      <div className={classes.Game}>
        <div className={classes.header}>
          <div>
            <div className={classes.player}>Player: <span>{this.props.playerName}</span></div>
            <div className={classes.steps}>Steps: <span>{this.state.steps}</span></div>
          </div>
          <div className={classes.buttons}>
            <button onClick={this.resetGame}>Reset</button>
            <button onClick={this.props.levelChangeHandler}>Change Level</button>
            <button onClick={this.props.endGameHandler}>End Game</button>
          </div>
          
        </div>
        <div className={classes.cards} style={this.style}>
          {this.cards.map((card, index) => (
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