const Monx = require("monx");
const api = require('../util/api.js');
const hodlMessages = require('../util/messages');

module.exports.store = {};

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      data: {
        calculated: false,
        isCalculating: false,
        calculatingString: 'a'
      },      
      BTC: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: 'a'        
      },
      ETH: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: 'a'
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
        stateCopy.calculatingString = hodlMessages.calculatingStrings[Math.floor(Math.random() * hodlMessages.calculatingStrings.length)];
        state.data = stateCopy;

        let button = document.getElementById('hodl-button');
        button.className = "fadeout";
        let message = document.getElementById('hodl-message');
        message.className = "fadein";
        let results = document.getElementById('hodl-results');

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

          let strings = state.BTC.showDiscount ? hodlMessages.hardReasons.concat(hodlMessages.easyReasons) : hodlMessages.easyReasons
          state.BTC.hodlReason = strings[Math.floor(Math.random() * strings.length)];

          strings = state.ETH.showDiscount ? hodlMessages.hardReasons.concat(hodlMessages.easyReasons) : hodlMessages.easyReasons
          state.ETH.hodlReason = strings[Math.floor(Math.random() * strings.length)];
          
          state.data = stateCopy;          
        }, 3000);
      }
    }
  });
}