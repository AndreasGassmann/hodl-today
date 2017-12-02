const Moon = require("moonjs");
const MoonRouter = require("moon-router");

const api = require('./util/api');

require("./store/store.js").init(Moon);
const store = require("./store/store.js").store;

require("./components/home.moon")(Moon);
require("./components/faq.moon")(Moon);
require("./components/eth.moon")(Moon);

Moon.use(MoonRouter);

const router = new MoonRouter({
  default: "/",
  map: {
    "/": "home",
    "/eth": "eth",
    "/faq": "faq"
  }
});

const app = new Moon({
  el: "#app",
  router,
  hooks: {
    mounted() {
      store.dispatch("FETCH_PRICES");
      store.dispatch("FETCH_HISTORY");
      setInterval(function () {
        store.dispatch("FETCH_PRICES");
      }, 10000);
    }
  }
});