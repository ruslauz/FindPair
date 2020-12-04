export const settings = {
      trainee: {
        numberOfCards: 4,
        rows: 2,
        columns: 2
      },
      junior: {
        numberOfCards: 20,
        rows: 4,
        columns: 5
      },
      middle: {
        numberOfCards: 24,
        rows: 4,
        columns: 6
      },
      senior: {
        numberOfCards: 30,
        rows: 5,
        columns: 6
      },
      // guru: {
      //   numberOfCards: 42,
      //   rows: 6,
      //   columns: 7
      // }
    }

  export const makeRandomArrayOfCards = carsdsAmount => {
    const result = [] 
    const arrayOfPairedNumbers = [...Array(carsdsAmount).keys()].map(i => i%(carsdsAmount/2) + 1)
    for (let i = 0; i < carsdsAmount; i++) {
      const index = Math.floor(Math.random() * carsdsAmount)
      if (!result[index]) {
        result[index] = arrayOfPairedNumbers[i]
      } else {
        i--
      }
    }
    return result.map((card, idx) => ({id: idx, value: card, isOpened: false}))
  }
