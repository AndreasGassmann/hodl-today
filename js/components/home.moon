<template>
  <div>
    <span class="ml15">
      <span class="word">
        <div>
          <input type="number" class="input-amount" placeholder="Amount">
          <div class="styled-select slate">
            <select>
              <option>BTC</option>
              <option>ETH</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        <button id="hodl-button" m-on:click="calculate">Should I HODL or SELL?</button>
        <br />
        <br />
        <div m-if="store.state.data.isCalculating" id="hodl-loader" class="loader">Loading...</div>
        <br />
        <br />
        <br />
        <div id="hodl-message">{{store.state.data.calculatingString}}</div>
      </span>
    </span>
    <div id="hodl-results">
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