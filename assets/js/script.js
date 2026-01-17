const dropList = document.querySelectorAll(".drop-list select");

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
    let flagCode;
    for(code in country_code){
        if(code == countryCode.value){

            flagCode = country_code[code];

            let imgElement = countryCode.parentElement.querySelector("img"); // selecting img tag of particular drop list
            imgElement.src = `https://www.flagcdn.com/48x36/${flagCode.toLowerCase()}.png`;
            break;
        }
    }
}