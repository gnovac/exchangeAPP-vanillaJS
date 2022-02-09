const amountOne = document.querySelector('.amount-one');
const currencyOne = document.querySelector('#currency-one');
const amountTwo = document.querySelector('.amount-two');
const currencyTwo = document.querySelector('#currency-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
    const url = `https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const currency1 = currencyOne.value;
            const currency2 = currencyTwo.value;

            const rate = data.rates[currency2];
            rateInfo.textContent = `${amountOne.value} ${currency1} = ${rate.toFixed(4)} ${currency2}`;
            amountTwo.value = (amountOne.value * rate).toFixed(4)
        })
}

const swapCurrency = () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrency)
calculate();