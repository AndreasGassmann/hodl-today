<template>
  <div>
  <span class="ml15">
  <span class="word">
  <button m-if="!store.state.data.isCalculating" class="button" m-on:click="calculate">Should I HODL or SELL?</button>
    <span m-if="store.state.data.isCalculating">{{store.state.data.calculatingString}}</span>
</span>
  </span><br /><br /><br />
  <div class="hodl-results" m-if="store.state.calculated">
  <p class="hodl-reason">{{store.state.BTC.hodlReason}}</p>
              <p class="btc-price">1 Bitcoin = ${{store.state.BTC.currentPrice}}</p>
      <p m-if="!store.state.BTC.showDiscount">In fact, you should consider buying <a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">MORE</a>!</p>
    <p m-if="store.state.BTC.showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy Bitcoin at a {{store.state.BTC.discount}}% discount!</a></p>
</div>
  </div>
</template>
<script>
  const store = require("../store/store.js").store;

  exports = {
    store: store,
    methods: {
      calculate: function() {
        store.dispatch('CALCULATE');
      }
    }
  };
</script>