import { retrieveCountryData, getCountriesData, getCountryData } from "./countries-data.js";

// displays contains of data in pretty print to the app
function displayJSONData(data){
    document.getElementById('apiOutput').textContent = JSON.stringify(data, null, 2);
}

//populate countries dropdown list
function populateCountriesDropdown(){
    const select = document.getElementById('countriesDropDown');

    getCountriesData().forEach(country => {
        const opt = document.createElement('option');
        opt.value = country.name.common;
        opt.innerHTML = country.name.common;
        select.appendChild(opt);
    });

    select.addEventListener('change', function() {
        handleCountrySelection(select.value);
    });
}

function handleCountrySelection(countryName){
    displayJSONData(getCountryData(countryName));
}

//document.getElementById('displayCountriesBtn').addEventListener('click', retrieveCountryData);
// Run this function when the page loads to fetch and display the country data
document.addEventListener('DOMContentLoaded', function() {
    retrieveCountryData().then(() => {
        displayJSONData(getCountriesData());
        populateCountriesDropdown();
    });
});