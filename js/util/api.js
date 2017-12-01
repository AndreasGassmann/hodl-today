let fetchPrices = () => {
  console.log('fetching prices');
  return new Promise((resolve, reject) => {
    fetch('http://api.hodlfolio.com/ath/bitstamp/').then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        reject('Looks like there was a problem. Status Code: ' +
          response.status);
      }

      // Examine the text in the response
      response.json().then(function (data) {
        let updateObject = {};

        updateObject.BTC_currentPrice = data.BTC_CURRENT;
        console.log('currentPrice BTC', data.BTC_CURRENT);
        console.log('discount BTC', (1 - (data.BTC_CURRENT / data.BTC_ATH)) * 100);
        updateObject.BTC_discount = Math.round((1 - (data.BTC_CURRENT / data.BTC_ATH)) * 10000) / 100;
        if (data.BTC_ATH > data.BTC_CURRENT) {
          updateObject.BTC_showDiscount = true;
        } else {
          updateObject.BTC_showDiscount = false;
        }


        // ETH
        updateObject.ETH_currentPrice = data.ETH_CURRENT;
        console.log('currentPrice ETH', data.ETH_CURRENT);
        console.log('discount ETH', (1 - (data.ETH_CURRENT / data.ETH_ATH)) * 100);
        updateObject.ETH_discount = Math.round((1 - (data.ETH_CURRENT / data.ETH_ATH)) * 10000) / 100;
        if (data.ETH_ATH > data.ETH_CURRENT) {
          updateObject.ETH_showDiscount = true;
        } else {
          updateObject.ETH_showDiscount = false;
        }

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