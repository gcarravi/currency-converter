
//CONFIGURATION
const apiKey = '5b6ec250805f815e06225ed0';


//DOM ELEMENTS
const dropList = document.querySelectorAll(".drop-list select");
const convertButton = document.querySelector("form button");
const container = document.querySelector('.container');
const themeToggle = document.querySelector('#themeToggle');
const swapIcon = document.querySelector('.icon');

// Populates the From and To drop downs
let selected;
let option;
for(let i=0; i<dropList.length; i++){
    for(country in country_code){
        // selecting USD and EUR by default as From and To.
        if(i ==  0){        //For select drop down
            selected = country == "USD" ? "selected" : "";
        } else if(i  == 1){ // To select drop down
            selected = country == "EUR" ? "selected" : "";
        }
        option = `<option value="${country}" ${selected}>${country}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", option); // inserts options tag inside select tag
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);   //loading the flag for the selected element
        // persist currency selections
        const fromSelect = document.querySelector('.from select');
        const toSelect = document.querySelector('.to select');
        localStorage.setItem('fromCurrency', fromSelect.value);
        localStorage.setItem('toCurrency', toSelect.value);
    });
}


function loadFlag(countryCode){
    for(code in country_code){
        if(code == countryCode.value){
            let imgElement = countryCode.parentElement.querySelector("img"); // selecting img tag of particular drop list
            imgElement.src = `https://www.flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
            break;
        }
    }
}

window.addEventListener("load", () => {
    // restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        container.classList.add('night');
        container.classList.remove('day');
    } else {
        container.classList.add('day');
        container.classList.remove('night');
    }
    // set icon based on theme
    const icon = themeToggle.querySelector('i');
    if (container.classList.contains('night')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // restore currency selections
    const savedFrom = localStorage.getItem('fromCurrency');
    const savedTo = localStorage.getItem('toCurrency');
    const fromSelect = document.querySelector('.from select');
    const toSelect = document.querySelector('.to select');
    if (savedFrom) {
        fromSelect.value = savedFrom;
        loadFlag(fromSelect);
    }
    if (savedTo) {
        toSelect.value = savedTo;
        loadFlag(toSelect);
    }

    getExchangeRate();
});


convertButton.addEventListener("click", () => {
    getExchangeRate();
});

// swap currencies when clicking the arrows
if (swapIcon) {
    swapIcon.addEventListener('click', () => {
        const fromSelect = document.querySelector('.from select');
        const toSelect = document.querySelector('.to select');
        const tmp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tmp;

        // update flags and persist
        loadFlag(fromSelect);
        loadFlag(toSelect);
        localStorage.setItem('fromCurrency', fromSelect.value);
        localStorage.setItem('toCurrency', toSelect.value);

        getExchangeRate();
    });
}


async function getExchangeRate() {
    const amountEl = document.querySelector('.amount input');
    const fromCurrency = document.querySelector('.from select');
    const toCurrency = document.querySelector('.to select');
    const conversionMessage = document.querySelector('.exchange-rate');

    let amountValue = parseFloat(amountEl.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        amountEl.value = '1';
        amountValue = 1;
    }

    convertButton.disabled = true;
    conversionMessage.innerText = 'Getting exchange rate...';

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCurrency.value];
        const conversion = (amountValue * exchangeRate).toFixed(2);
        const finalConversion = conversion === '0.00' ? amountValue * exchangeRate : conversion;
        conversionMessage.innerText = `${amountValue} ${fromCurrency.value} = ${finalConversion} ${toCurrency.value}`;
    } catch (err) {
        conversionMessage.innerText = 'Something went wrong';
    } finally {
        convertButton.disabled = false;
    }
}


// THEME TOGGLE
themeToggle.addEventListener('click', () => {
    container.classList.toggle('night');
    container.classList.toggle('day');

    const icon = themeToggle.querySelector('i');
    if (container.classList.contains('night')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'night');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'day');
    }
});