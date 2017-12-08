const Moon = require("moonjs");

const api = require('./util/api');

require("./store/store.js").init(Moon);
const store = require("./store/store.js").store;

require("./components/home.moon")(Moon);

const app = new Moon({
  el: "#app",
  hooks: {
    mounted() {
      store.dispatch("FETCH_PRICES");
      setInterval(function () {
        store.dispatch("FETCH_PRICES");
      }, 10000);

      var modal = document.getElementById('myModal');
      var span = document.getElementsByClassName("close")[0];

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
      }
    }
  },
  methods: {
    openModal: function() {
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
    },
    changeCurrency: function() {
      store.dispatch('CHANGE_CURRENCY');
    }
  },
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

require('./util/lambo');