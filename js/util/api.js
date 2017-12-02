let fetchPrices = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.hodlfolio.com/ath/bitstamp/').then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return reject();
      }

      response.json().then(function (data) {

        // BTC
        let BTC = {};
        BTC.currentPrice = data.BTC_CURRENT;
        BTC.discount = Math.round((1 - (data.BTC_CURRENT / data.BTC_ATH)) * 10000) / 100;
        BTC.showDiscount = data.BTC_ATH > data.BTC_CURRENT;

        console.log('currentPrice BTC', BTC.currentPrice);
        console.log('showing BTC discount ', BTC.discount);
        console.log('discount BTC', BTC.showDiscount);

        // ETH
        let ETH = {};
        ETH.currentPrice = data.ETH_CURRENT;
        ETH.discount = Math.round((1 - (data.ETH_CURRENT / data.ETH_ATH)) * 10000) / 100;
        ETH.showDiscount = data.ETH_ATH > data.ETH_CURRENT;

        console.log('currentPrice ETH', ETH.currentPrice);
        console.log('showing ETH discount ', ETH.discount);
        console.log('discount ETH', ETH.showDiscount);

        resolve({
          BTC,
          ETH
        });
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