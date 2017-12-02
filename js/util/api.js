let fetchPrices = () => {
  return new Promise((resolve, reject) => {
    fetch('http://api.hodlfolio.com/ath/bitstamp/').then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return reject();
      }

      response.json().then(function (data) {
        let updateObject = {};

        // BTC
        updateObject.BTC_currentPrice = data.BTC_CURRENT;
        updateObject.BTC_discount = Math.round((1 - (data.BTC_CURRENT / data.BTC_ATH)) * 10000) / 100;
        updateObject.BTC_showDiscount = data.BTC_ATH > data.BTC_CURRENT;

        console.log('currentPrice BTC', updateObject.BTC_currentPrice);
        console.log('showing BTC discount ', updateObject.BTC_showDiscount);
        console.log('discount BTC', updateObject.BTC_discount);

        // ETH
        updateObject.ETH_currentPrice = data.ETH_CURRENT;
        updateObject.ETH_discount = Math.round((1 - (data.ETH_CURRENT / data.ETH_ATH)) * 10000) / 100;
        updateObject.ETH_showDiscount = data.ETH_ATH > data.ETH_CURRENT;

        console.log('currentPrice ETH', updateObject.ETH_currentPrice);
        console.log('showing ETH discount ', updateObject.ETH_showDiscount);
        console.log('discount ETH', updateObject.ETH_discount);

        resolve(updateObject);
      });
    }).catch(function (err) {
      console.log('Fetch Error :-S', err);
      reject(err);
    });
  });
}

module.exports = {
  fetchPrices: fetchPrices
}