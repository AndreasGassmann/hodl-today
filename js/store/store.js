const Monx = require("monx");
const api = require("../util/api.js");

module.exports.store = {};

module.exports.init = function (Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      BTC: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0
      },
      ETH: {
        currentPrice: 0,
        showDiscount: false,
        discount: 0
      },
      charts: {
        BTC: {}
      }
    },
    actions: {
      "FETCH_PRICES": (state, info) => {
        api.fetchPrices().then(data => {
            state.BTC = data.BTC;
            state.ETH = data.ETH;
          })
          .catch(err => console.log('error fetching prices', err));
      },
      "FETCH_HISTORY": (state, info) => {
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json').then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            response.json().then(function (data) {
              let chartLabels = [];
              let chartData = [];
              for (let key in data.bpi) {
                if (data.bpi[key]) {
                  chartLabels.push(key);
                  chartData.push(data.bpi[key]);
                }
              }
              state.charts.showChart = true;
              state.charts.data = chartData;

              let el = document.getElementById('myChart');
              if (el) {
                var ctx = el.getContext("2d");
                var gradientStroke = ctx.createLinearGradient(0, 500, 0, 0);
                gradientStroke.addColorStop(0, '#FFFFFF');
                gradientStroke.addColorStop(1, '#FFFFFF');
                var gradientFill = ctx.createLinearGradient(0, 350, 0, 0);
                gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");
                gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.2)");
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                    labels: chartLabels,
                    datasets: [{
                      label: "Data",
                      borderColor: gradientStroke,
                      pointBorderColor: gradientStroke,
                      pointBackgroundColor: gradientStroke,
                      pointHoverBackgroundColor: gradientStroke,
                      pointHoverBorderColor: gradientStroke,
                      pointBorderWidth: 0,
                      pointHoverRadius: 0,
                      pointHoverBorderWidth: 0,
                      pointRadius: 0,
                      fill: true,
                      backgroundColor: gradientFill,
                      borderWidth: 1,
                      data: chartData
                    }]
                  },
                  options: {
                    animation: {
                      duration: 1500,
                      easing: "easeInOutElastic"
                    },
                    legend: {
                      position: "bottom",
                      display: false
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          fontColor: "rgba(255,255,255,0.5)",
                          fontStyle: "bold",
                          beginAtZero: false,
                          maxTicksLimit: 5,
                          padding: 20
                        },
                        gridLines: {
                          drawTicks: false,
                          display: false
                        }
                      }],
                      xAxes: [{
                        gridLines: {
                          zeroLineColor: "transparent",
                          drawTicks: false,
                          display: false
                        },
                        ticks: {
                          padding: 20,
                          fontColor: "rgba(255,255,255,0.5)",
                          fontStyle: "bold"
                        }
                      }]
                    }
                  }
                });
              }
            });

          })
          .catch(function (err) {
            console.log('Fetch Error :-S', err);
          });
      }
    },
  });
}