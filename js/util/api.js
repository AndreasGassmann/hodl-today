const coinNames = require('./coinNames');

let fetchPrices = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.hodlfolio.com/prices/ath').then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return reject();
      }

      response.json().then(function (data) {

        let object = {};
        Object.keys(coinNames).forEach(c => {
          object[c] = savePrices(data, c);
        });
        
        resolve(object);
      });
    }).catch(function (err) {
      console.log('Fetch Error :-S', err);
      reject(err);
    });
  });
}

let savePrices = (data, name) => {
  let discount = Math.round((1 - (data[name].current / data[name].ATH)) * 10000) / 100;
  return {
    currentPrice: data[name].current,
    discount: discount,
    showDiscount: discount > 3
  };
};

module.exports = {
  fetchPrices: fetchPrices
}