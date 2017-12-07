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
      setInterval(function () {
        store.dispatch("FETCH_PRICES");
      }, 10000);
    }
  }
});

setTimeout(() => {
  anime.timeline({
    loop: false
  })
  .add({
    targets: '.ml15 .word',
    scale: [5, 1],
    opacity: [0, 1],
    easing: "easeOutCirc",
    duration: 800,
    delay: function (el, i) {
      return 800 * i;
    }
  });
}, 200);
