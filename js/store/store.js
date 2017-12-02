const Monx = require("monx");
const api = require("../util/api.js");

module.exports.store = {};

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      BTC: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0
      },
      ETH: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0
      }
    },
    actions: {
      "FETCH_PRICES": (state, info) => {
        api.fetchPrices().then(data => {
            state.BTC = data.BTC;
            state.ETH = data.ETH;
          })
          .catch(err => console.log('error fetching prices', err));
      },
    }
  });
}