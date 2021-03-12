axios.defaults.baseURL = 'https://api.nbp.pl/api/exchangerates/rates/A';

let resultBtn = document.querySelector('.result');
resultBtn.addEventListener('click', calculateRate);

function calculateRate() {

  let selCurrency = document.getElementById('sel-currency').value;
  let errorInfo = document.querySelector('.info');
  
  axios.get(`/${selCurrency}`)
    .then(response => {
      let lastTblDate = response.data.rates[0].effectiveDate;
      let lastRate = response.data.rates[0].mid;
      let code = response.data.code;
      refreshValOutput(lastRate, errorInfo, code, lastTblDate);
    })
};

function refreshValOutput(lastRate, errorInfo, code, lastTblDate) {
  let insertVal = document.querySelector('.val').value;
  insertVal = insertVal.replace(",", ".");
  insertVal = Number.parseFloat(insertVal);
  insertVal = Math.round(insertVal * 100) / 100;

  if (isNaN(insertVal)) {
    errorInfo.style.setProperty('visibility', 'visible');
  }
  else {
    let totalInCurr = insertVal * lastRate
    const totalVal = document.querySelector('.value');
    totalVal.innerText = totalInCurr.toFixed(2).replace(".", ",") + ' PLN';
    errorInfo.style.setProperty('visibility', 'hidden');
    return totalInCurr;
  };
};