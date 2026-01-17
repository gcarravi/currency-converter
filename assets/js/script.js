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
}