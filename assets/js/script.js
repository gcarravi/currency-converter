
//CONFIGURATION
const apiKey = '5b6ec250805f815e06225ed0';


//DOM ELEMENTS
const dropList = document.querySelectorAll(".drop-list select");
const convertButton = document.querySelector("form button");
const body = document.body;
const container = document.querySelector('.container');

// Populates the From and To drop downs
for(let i=0; i<dropList.length; i++){
    for(country in country_code){
        // selecting USD and EUR by default as From and To.
        let selected;
        if(i ==  0){        //For select drop down
            selected = country == "USD" ? "selected" : "";
        } else if(i  == 1){ // To select drop down
            selected = country == "EUR" ? "selected" : "";
        }
        let option = `<option value="${country}" ${selected}>${country}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", option); // inserts options tag inside select tag
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);   //loading the flag for the selected element
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

window.addEventListener("load", e => {
    e.preventDefault();
    getExchangeRate();
})


convertButton.addEventListener("click", () => {
    getExchangeRate();
})


function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const fromCurrency = document.querySelector(".from select");
    const toCurrency = document.querySelector(".to select");
    const conversionMessage = document.querySelector(".exchange-rate");

    let amountValue = amount.value;
    if(amountValue == "" || amountValue=="0"){
        amount.value = "1";
        amountValue = 1;
    }

    conversionMessage.innerText = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    
    fetch(url)
    .then(response  => response.json())
    .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let convertion = (amountValue * exchangeRate).toFixed(2);
        let finalConvertion = convertion == "0.00" ? amountValue * exchangeRate : convertion;
        conversionMessage.innerText = `${amountValue} ${fromCurrency.value} = ${finalConvertion} ${toCurrency.value}`;
    }).catch(() => {
        conversionMessage.innerText = "Something went wrong";  // catches any errors that may occur at the time of the fetching
    });
}


//THEME TOGGLE
themeToggle.addEventListener('click', () => {
  container.classList.toggle('night');
  container.classList.toggle('day');

  const icon = themeToggle.querySelector('i');
  if (container.classList.contains('night')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});