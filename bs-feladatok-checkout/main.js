'use strict'

const statesUsa = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam",
"Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana",
"North Carolina", " North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island",
"South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

const statesHun = ["Bács-Kiskun megye", "Baranya megye", "Békés megye", "Borsod-Abaúj-Zemplén megye", "Csongrád megye", "Fejér megye", "Győr-Moson-Sopron megye", "Hajdú-Bihar megye", "Heves megye",
"Jász-Nagykun-Szolnok megye", "Komárom-Esztergom megye", "Nógrád megye", "Pest megye", "Somogy megye", "Szabolcs-Szatmár-Bereg megye", "Tolna megye", "Vas megye", "Veszprém megye", "Zala megye"]

const countryInput = document.querySelector("#countrySelect")
const stateInput = document.querySelector("#stateSelect")

const setStatesUsa = () => {
    for (let i = 0; i < statesUsa.length; i++) {
        const option = document.createElement("option");    
        option.textContent = statesUsa[i];
        stateInput.appendChild(option);
    }
}

const setStatesHun = () => {
    for (let i = 0; i < statesHun.length; i++) {
        const option = document.createElement("option");    
        option.textContent = statesHun[i];
        stateInput.appendChild(option);
    }
}

const selectCountryFunction = (event) => {
    console.log(typeof countryInput.value) 
    if (countryInput.value === "USA") {
        setStatesUsa()
    } else if (countryInput.value === "Hungary") {
        setStatesHun()
    }
}

const selectionListener = () => {
    console.log(countryInput)
    countryInput.addEventListener('change', selectCountryFunction);
    return console.log("I am selectionListener")
}

selectionListener();
