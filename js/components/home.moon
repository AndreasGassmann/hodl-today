<template>
  <div>
    <p>BTC {{store.state.BTC_currentPrice}}</p>
    <p m-if="store.state.BTC_showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy at a {{store.state.BTC_discount}}% discount!</a></p>
  </div>
</template>
<script>
  const store = require("../store/store.js").store;

  exports = {
    store: store
  };
</script>