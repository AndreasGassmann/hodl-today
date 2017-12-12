<template>
  <div>
    <span class="ml15">
      <span class="word">
        <div>
          <div>
            <input m-model="amount" type="number" class="input-amount" placeholder="Amount">
            <div class="styled-select slate">
              <select m-model="currency">
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
         <button id="hodl-button" m-on:click="calculate">Should I HODL or SELL?</button>
        </div>
      </span>
    </span>
    <div id="hodl-loading">
      <div m-if="store.state.data.isCalculating" id="hodl-loader" class="loader">Loading...</div>
        <div id="hodl-message">{{store.state.data.calculatingString}}</div>
      </div>
    <div id="hodl-results">
      <p class="hodl-reason">{{store.state.data.hodlReason}}</p>
      <p class="btc-price">{{store.state.data.amountString}}</p>
      <p m-if="!store.state.data.showDiscount">In fact, you should consider buying <a href="https://www.coinbase.com/signup?r=5a1f80ba5893bb00d70fcff5" target="_blank">MORE</a>!</p>
      <p m-if="store.state.data.showDiscount"><a href="https://www.coinbase.com/signup?r=5a1f80ba5893bb00d70fcff5" target="_blank">Buy {{store.state.data.currencyName}} at a {{store.state.data.discount}}% discount!</a></p>
    </div>
  </div>
</template>
<script>
  const store = require("../store/store.js").store;

  exports = {
    data: () => ({
        amount: 1,
        currency: 'BTC'
    }),
    store: store,
    methods: {
      calculate: function() {
        store.dispatch('CALCULATE', {
          amount: this.get('amount'),
          currency: this.get('currency')
        });
      }
    }
  };
</script>