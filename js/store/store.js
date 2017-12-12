const Monx = require("monx");
const api = require('../util/api.js');
const hodlMessages = require('../util/messages');
const coinNames = require('../util/coinNames');

module.exports.store = {};

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      data: {
        calculated: false,
        isCalculating: false,
        calculatingString: 'HODL',
        hodlReason: 'HODL',
        amountString: 'HODL',
        showDiscount: false,
        discount: 0
      },
      prices: {}
    },
    actions: {
      "FETCH_PRICES": (state, info) => {
        api.fetchPrices().then(data => {
            state.prices = data;
          })
          .catch(err => console.log('error fetching prices', err));
      },
      "CALCULATE": (state, info) => {
        let stateCopy = state.data;
        stateCopy.isCalculating = true;
        stateCopy.calculatingString = hodlMessages.calculatingStrings[Math.floor(Math.random() * hodlMessages.calculatingStrings.length)];
        state.data = stateCopy;

        let message = document.getElementById('hodl-message');
        message.className = "fadein";
        let results = document.getElementById('hodl-results');

        if (results.className) {
          results.className = "";          
        }

        setTimeout(() => {
          message.className = "";
          results.className = "fadein";

          stateCopy = state.data;
          stateCopy.calculated = true;
          stateCopy.isCalculating = false;

          console.log(coinNames);
          let coin = state.prices[info.currency];

          let strings = coin.showDiscount ? hodlMessages.hardReasons.concat(hodlMessages.easyReasons) : hodlMessages.easyReasons
          stateCopy.hodlReason = strings[Math.floor(Math.random() * strings.length)]
            .replace('{coin}', coinNames[info.currency])
            .replace('{coin_short}', info.currency);
                    
          stateCopy.amountString = info.amount + ' ' + coinNames[info.currency] + ' = $' + Math.round(info.amount * coin.currentPrice * 100) / 100;
          
          stateCopy.showDiscount = coin.showDiscount;
          stateCopy.discount = coin.discount;

          state.data = stateCopy;          
        }, 3000);
      }
    }
  });
}