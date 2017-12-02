<template>
  <div>
    <p>ETH price: ${{store.state.ETH_currentPrice}}</p>
    <p m-if="store.state.ETH_showDiscount"><a href="https://www.coinbase.com/join/5a1f80ba5893bb00d70fcff5">Buy ETH at a {{store.state.ETH_discount}}% discount!</a></p>
  </div>
</template>
<script>
  const store = require("../store/store.js").store;

  exports = {
    store: store
  };
</script>