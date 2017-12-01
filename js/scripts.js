const Moon = require("moonjs");
const MoonRouter = require("moon-router");

const api = require('./util/api');

require("./store/store.js").init(Moon);

require("./components/header.moon")(Moon);
require("./components/faq.moon")(Moon);
require("./components/eth.moon")(Moon);

Moon.use(MoonRouter);

const router = new MoonRouter({
  default: "/",
  map: {
    "/": "Home",
    "/eth": "eth",
    "/faq": "faq"
  }
});

Moon.component("price-and-discount", {
  props: ['data'],
  template: `<div>asdf
      <p>{{ data.name }} {{ data.currentPrice }}</p>
      <p m-if="data.showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy at a {{data.discount}}% discount!</a></p>
    </div>`
});

Moon.component("Home", {
  template: `<price-and-discount data="{{parentMsg}}"></price-and-discount>`
});
/*
Moon.component("ETH", {
  template: `<div>
      <p>ETH {{store.state.ETH_currentPrice}}</p>
      <p m-if="store.state.ETH_showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy at a {{store.state.ETH_discount}}% discount!</a></p>
    </div>`,
  store
});*/
/*
Moon.component("FAQ", {
  template: `<div>
  <h2>What is HODL?</h2>
  <p>The word comes from an epic drunkpost on the Bitcoin Forum where the guy misspelled "HOLDING" as "HODLING". <a href="https://bitcointalk.org/index.php?topic=375643.0">Thread</a></p>
  <h2>Why should I HODL?</h2>
  <p>The price of crypto currencies is very volatile. 10% or 20% swings in one day are nothing special.<br />
  If you believe in the idea behind cryptocurrencies, you should not let yourself get stressed over those swings. Because in the long term, the price will most likely go up. <a href="https://www.youtube.com/watch?v=XbZ8zDpX2Mg">Relevant Video</a></p>
</div>`,
  store
});
*/
const app = new Moon({
  el: "#app",
  router,
  methods: {
    updatePrice: function (data) {
      console.log('data', data); // doesn't this work?
      store.dispatch('updatePrice', updateObject);
    }
  }
});

let updateObject = {};

api.fetchPrices().then((data) => {
  console.log('test');
  updateObject = data;
  //app.callMethod('updatePrice', data);
}).catch((err) => console.log('error fetching prices', err));