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
        calculatingString: 'a',
        hodlReason: 'a',
        amountString: 'a',
        showDiscount: false,
        discount: 0
      },      
      BTC: {
        name: 'Bitcoin',
        currentPrice: 0,
        showDiscount: false,
        discount: 0,
        hodlReason: 'a'        
      },
      ETH: {
        name: 'Ether',
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
            data.BTC.name = state.BTC.name;
            data.ETH.name = state.ETH.name;
            state.BTC = data.BTC;
            state.ETH = data.ETH;
          })
          .catch(err => console.log('error fetching prices', err));
      },
      "CALCULATE": (state, info) => {
        let stateCopy = state.data;
        stateCopy.isCalculating = true;
        stateCopy.calculatingString = hodlMessages.calculatingStrings[Math.floor(Math.random() * hodlMessages.calculatingStrings.length)];
        state.data = stateCopy;

        //let button = document.getElementById('hodl-button');
        //button.className = "fadeout";
        let message = document.getElementById('hodl-message');
        message.className = "fadein";
        let results = document.getElementById('hodl-results');

        if (results.className) {
          results.className = "";          
        }

        setTimeout(() => {
          //button.className = "fadein";
          message.className = "";
          results.className = "fadein";

          stateCopy = state.data;
          stateCopy.calculated = true;
          stateCopy.isCalculating = false;

          let strings = state.BTC.showDiscount ? hodlMessages.hardReasons.concat(hodlMessages.easyReasons) : hodlMessages.easyReasons
          state.BTC.hodlReason = strings[Math.floor(Math.random() * strings.length)];
          state.BTC.hodlReason = state.BTC.hodlReason.replace('{coin}', 'Bitcoin')
          state.BTC.hodlReason = state.BTC.hodlReason.replace('{coin_short}', 'BTC')
          
          strings = state.ETH.showDiscount ? hodlMessages.hardReasons.concat(hodlMessages.easyReasons) : hodlMessages.easyReasons
          state.ETH.hodlReason = strings[Math.floor(Math.random() * strings.length)];
          state.ETH.hodlReason = state.ETH.hodlReason.replace('{coin}', 'Ether')
          state.ETH.hodlReason = state.ETH.hodlReason.replace('{coin_short}', 'ETH')
          
          stateCopy.hodlReason = state[info.currency].hodlReason;
          stateCopy.amountString = info.amount + ' ' + state[info.currency].name + ' = $' + Math.round(info.amount * state[info.currency].currentPrice);
          
          stateCopy.showDiscount = state[info.currency].showDiscount;
          stateCopy.discount = state[info.currency].discount;

          stateCopy.currencyName = state[info.currency].name;

          state.data = stateCopy;          
        }, 3000);
      }
    }
  });
}