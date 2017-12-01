const Moon = require("moonjs");
const MoonRouter = require("moon-router");

const api = require('./util/api');

require("./store/store.js").init(Moon);

require("./components/home.moon")(Moon);
require("./components/faq.moon")(Moon);
require("./components/eth.moon")(Moon);

Moon.use(MoonRouter);

const router = new MoonRouter({
  default: "/",
  map: {
    "/": "Home",
    "/eth": "eth",
    "/faq": "faq"
  },
  mode: "history"
});

const app = new Moon({
  el: "#app",
  router
});