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

    // Select initial value of dropdown
    document.getElementById('countriesDropDown').selectedIndex= 0;
    handleCountrySelection(document.getElementById('countriesDropDown').value);
}

function prettyDisplay(countryData){
    document.getElementById('countryName').innerHTML = countryData.name.common;
    document.getElementById('countryFlag').src = countryData.flags.png;
    document.getElementById('countryCurrency').innerHTML = "<strong>Currency:</strong> " + countryData.currencies[Object.keys(countryData.currencies)[0]].name;
    document.getElementById('countryRegion').innerHTML = "<strong>Region:</strong> " + countryData.region;
    document.getElementById('countryCapital').innerHTML = "<strong>Capital city:</strong> "  + countryData.capital;
    document.getElementById('countryPopulation').innerHTML = "<strong>Population:</strong> "  + countryData.population;
    document.getElementById('countryLanguage').innerHTML = "<strong>Language:</strong> "  + 
    Object.entries(countryData.languages).map(([key, value]) => `${value} (${key})`).join(', '); // Join the formatted strings with a comma
}

function handleCountrySelection(countryName){
    var countryData = getCountryData(countryName);
    displayJSONData(countryData);
    prettyDisplay(countryData);
}

//document.getElementById('displayCountriesBtn').addEventListener('click', retrieveCountryData);
// Run this function when the page loads to fetch and display the country data
document.addEventListener('DOMContentLoaded', function() {
    retrieveCountryData().then(() => {
        displayJSONData(getCountriesData());
        populateCountriesDropdown();
    });
});