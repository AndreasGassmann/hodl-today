/*=============================
  Primary Application Code
=============================*/

const Moon = require("moonjs");
const MoonRouter = require("moon-router");
const Monx = require("monx");

Moon.use(MoonRouter);
Moon.use(Monx);

require("./components/header.moon")(Moon);

const router = new MoonRouter({
  default: "/",
  map: {
    "/": "Home",
    "/eth": "ETH",
    "/faq": "FAQ"
  }
});

const store = new Monx({
  state: {
    BTC_currentPrice: 0,
    BTC_showDiscount: false,
    BTC_discount: 0,
    ETH_currentPrice: 0,
    ETH_showDiscount: false,
    ETH_discount: 0
  },
  actions: {
    updatePrice: (state, payload) => {
      state.BTC_currentPrice = payload.BTC_currentPrice;
      state.BTC_showDiscount = payload.BTC_showDiscount;
      state.BTC_discount = payload.BTC_discount;
      state.ETH_currentPrice = payload.ETH_currentPrice;
      state.ETH_showDiscount = payload.ETH_showDiscount;
      state.ETH_discount = payload.ETH_discount;

      console.log('updating store', state);
    }
  }
});

Moon.component("Home", {
  template: `<div>
      <p>BTC {{store.state.BTC_currentPrice}}</p>
      <p m-if="store.state.BTC_showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy at a {{store.state.BTC_discount}}% discount!</a></p>
    </div>`,
  store: store
});

Moon.component("ETH", {
  template: `<div>
      <p>ETH {{store.state.ETH_currentPrice}}</p>
      <p m-if="store.state.ETH_showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy at a {{store.state.ETH_discount}}% discount!</a></p>
    </div>`,
  store: store
});

Moon.component("FAQ", {
  data: function () {
    return {
      title: 'FAQ'
    }
  },
  template: `<div>
    <h2>What is HODL?</h2>
    <p>The word comes from an epic drunkpost on the Bitcoin Forum where the guy misspelled "HOLDING" as "HODLING". <a href="https://bitcointalk.org/index.php?topic=375643.0">Thread</a></p>
    <h2>Why should I HODL?</h2>
    <p>The price of crypto currencies is very volatile. 10% or 20% swings in one day are nothing special.<br />
    If you believe in the idea behind cryptocurrencies, you should not let yourself get stressed over those swings. Because in the long term, the price will most likely go up. <a href="https://www.youtube.com/watch?v=XbZ8zDpX2Mg">Relevant Video</a></p>
  </div>`,
  store: store
});

const app = new Moon({
  el: "#app",
  router: router,
  data: {},
  methods: {
    updatePrice: function (payload) {
      console.log('updating price');
      store.dispatch('updatePrice', updateObject);
    }
  },
  store: store
});

let updateObject = {};

fetch('http://api.hodlfolio.com/ath/bitstamp/')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        updateObject.BTC_currentPrice = data.BTC_CURRENT;
        console.log('currentPrice BTC', data.BTC_CURRENT);
        console.log('discount BTC', (1 - (data.BTC_CURRENT / data.BTC_ATH)) * 100);
        updateObject.BTC_discount = Math.round((1 - (data.BTC_CURRENT / data.BTC_ATH)) * 10000) / 100;
        if (data.BTC_ATH > data.BTC_CURRENT) {
          updateObject.BTC_showDiscount = true;
        } else {
          updateObject.BTC_showDiscount = false;
        }


        // ETH
        updateObject.ETH_currentPrice = data.ETH_CURRENT;
        console.log('currentPrice ETH', data.ETH_CURRENT);
        console.log('discount ETH', (1 - (data.ETH_CURRENT / data.ETH_ATH)) * 100);
        updateObject.ETH_discount = Math.round((1 - (data.ETH_CURRENT / data.ETH_ATH)) * 10000) / 100;
        if (data.ETH_ATH > data.ETH_CURRENT) {
          updateObject.ETH_showDiscount = true;
        } else {
          updateObject.ETH_showDiscount = false;
        }

        app.callMethod('updatePrice');

        console.log(app);
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });