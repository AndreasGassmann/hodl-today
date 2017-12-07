const Monx = require("monx");
const api = require("../util/api.js");

module.exports.store = {};

let hodlStore = {
  hodlEasyReasons: [
    'You should definitely HODL! Enjoy the moon! 🌖',
    'Now is a good time to HODL! Enjoy the ride! 🎢',
    'HODL today, MOON tomorrow! 🌖',
    '#HODL #LAMBO',
    '#🌘 #HODL',
    'HODL is key. Don\'t let the FUD get to you...',
    'Keep calm and HODL!',
    'The best part of the ride is still ahead! #HODL!',
    'NEVER SELL, ONLY HODL!',
    'I don\'t always sell my Bitcoin. But when I do, I immediately regret my decision. #HODL',
    'According to our Moon Math, you should HODL!',
    'Buy high, sell low! #HODL',
    'Reaching escape velocity... 🚀 #HODL',
    'Noone will know you are a bad trader if you just HODL!'    
  ],
  hodlHardReasons: [
    'Looks like we\'re in a small dip. Just sit back and HODL!',
    'That\'s it. The bubble has burst! 💥 You must be strong now! #FUD #HODL',
    'Soon it will be back on track to a new ATH 📈... JUST HODL!',
    'Y\'All got any more of them cheap Coins? #HODL'
  ],
  calculatingStrings: [
    'Synchronizing with Blockchain...',
    'Fetching latest data from coinmarketcap...',
    'Turning on Quantum Computer...',
    'Analyzing CryptoKitty prices... 🐱',
    'Preparing rocket launch... #MOON',
    'Preparing for moon landing... 🚀',
    'Getting latest Moon Math results... 🌖'
  ]
}

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      data: {
        calculated: false,
        isCalculating: false,
        calculatingString: 'sadf'
      },      
      BTC: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: 'f'        
      },
      ETH: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: 'f'
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
        let stateCopy = state;
        stateCopy.isCalculating = true;
        stateCopy.calculatingString = hodlStore.calculatingStrings[Math.floor(Math.random() * hodlStore.calculatingStrings.length)];
        state.data = stateCopy;

        let button = document.getElementById('hodl-button');
        button.className = "fadeout";
        let message = document.getElementById('hodl-message');
        message.className = "fadein";
        let results = document.getElementById('hodl-results');
        console.log(results.className);
        if (results.className) {
          results.className = "";          
        }

        setTimeout(() => {
          button.className = "fadein";
          message.className = "";
          results.className = "fadein";

          stateCopy = state;
          stateCopy.calculated = true;
          stateCopy.isCalculating = false;

          let strings = state.BTC.showDiscount ? hodlStore.hodlHardReasons.concat(hodlStore.hodlEasyReasons) : hodlStore.hodlEasyReasons
          state.BTC.hodlReason = strings[Math.floor(Math.random() * strings.length)];

          strings = state.ETH.showDiscount ? hodlStore.hodlHardReasons.concat(hodlStore.hodlEasyReasons) : hodlStore.hodlEasyReasons
          state.ETH.hodlReason = strings[Math.floor(Math.random() * strings.length)];
          
          state.data = stateCopy;          
        }, 5000);
      }
    }
  });
}