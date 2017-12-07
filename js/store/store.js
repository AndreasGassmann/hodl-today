const Monx = require("monx");
const api = require("../util/api.js");

module.exports.store = {};

let hodlStore = {
  hodlEasyReasons: [
    'You should definitely HODL!',
    'Now is a good time to HODL!',
    'HODL today, MOON tomorrow!',
    '#LAMBO'
  ],
  hodlHardReasons: [
    'Looks like we\'re in a small dip. Just sit back and HODL!',
    'HODL is key. Don\'t let the FUD get to you...',
    'That\'s it. The bubble has burst! #FUD',
    'Keep calm and HODL!',
    'The best part of the ride is just ahead! Just HODL!',
    'Soon it will be back on track to a new ATH... JUST HODL!',
    'NEVER SELL, ONLY HODL!',
    'I don\'t always sell my bitcoin. But when I do, I immediately regret my decision. #HODL',
    'Y\'All got any more of them cheap Bitcoins? #HODL'
  ],
  calculatingStrings: [
    'Synchronizing with Blockchain...',
    'Fetching latest data from coinmarketcap...',
    'Turning on Quantum Computer...',
    'Analyzing CryptoKittiy prices...',
    'Preparing rocket launch... #MOON'
  ]
}

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      data: {
        calculated: false,
        isCalculating: false,
        calculatingString: ''
      },      
      BTC: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: ''        
      },
      ETH: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: ''
      },
    },
    actions: {
      "FETCH_PRICES": (state, info) => {
        api.fetchPrices().then(data => {
            data.BTC.hodlReason = state.BTC.hodlReason;
            data.ETH.hodlReason = state.ETH.hodlReason;
            state.BTC = data.BTC;
            state.ETH = data.ETH;            
          })
          .catch(err => console.log('error fetching prices', err));
      },
      "CALCULATE": (state, info) => {
        console.log('CALCULATE');
        let stateCopy = state;
        stateCopy.isCalculating = true;
        stateCopy.calculatingString = hodlStore.calculatingStrings[Math.floor(Math.random() * hodlStore.calculatingStrings.length)];
        state.data = stateCopy;
        setTimeout(() => {
          stateCopy = state;
          stateCopy.calculated = true;
          stateCopy.isCalculating = false;

          let strings = state.BTC.showDiscount ? hodlStore.hodlHardReasons : hodlStore.hodlEasyReasons
          state.BTC.hodlReason = strings[Math.floor(Math.random() * strings.length)];

          strings = state.ETH.showDiscount ? hodlStore.hodlHardReasons : hodlStore.hodlEasyReasons
          state.ETH.hodlReason = strings[Math.floor(Math.random() * strings.length)];
          
          state.data = stateCopy;          
        }, 2000);
      }
    }
  });
}