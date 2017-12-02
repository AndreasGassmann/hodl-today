<template>
  <div>
    <p>Bitcoin price: ${{store.state.BTC.currentPrice}}</p>
    <p m-if="store.state.BTC.showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy Bitcoin at a {{store.state.BTC.discount}}% discount!</a></p>
    <div style="margin: auto; width: 500px; height: 500px;">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
  </div>
</template>
<script>
  const store = require("../store/store.js").store;

  exports = {
    store: store,
    hooks: {
      mounted: function() {
        // called when element is mounted and the first build has been run
        store.dispatch("FETCH_HISTORY");
      }
    }
  };
</script>