const Monx = require("monx");
const api = require("../util/api.js");

module.exports.store = {};

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      BTC_currentPrice: 0,
      BTC_showDiscount: false,
      BTC_discount: 0,
      ETH_currentPrice: 0,
      ETH_showDiscount: false,
      ETH_discount: 0
    },
    actions: {
      "FETCH_PRICES": (state, info) => {
        console.log('fetch_prices');

        api.fetchPrices().then(data => {
            state.BTC_currentPrice = data.BTC_currentPrice;
            state.BTC_showDiscount = data.BTC_showDiscount;
            state.BTC_discount = data.BTC_discount;
            state.ETH_currentPrice = data.ETH_currentPrice;
            state.ETH_showDiscount = data.ETH_showDiscount;
            state.ETH_discount = data.ETH_discount;
          })
          .catch(err => console.log('error fetching prices', err));
      },
    }
  });
}