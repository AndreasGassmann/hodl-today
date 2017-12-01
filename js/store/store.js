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
        const instance = info.instance;

        api.fetchPrices().then(data => {
            state.BTC_currentPrice = payload.BTC_currentPrice;
            state.BTC_showDiscount = payload.BTC_showDiscount;
            state.BTC_discount = payload.BTC_discount;
            state.ETH_currentPrice = payload.ETH_currentPrice;
            state.ETH_showDiscount = payload.ETH_showDiscount;
            state.ETH_discount = payload.ETH_discount;
          })
          .catch(err => console.log('error fetching prices', err));
        api.getList(type, page).then(function (data) {
          instance.set("next", data.next);
          instance.set("list", data.list);
        });
      },
    }
  });
}