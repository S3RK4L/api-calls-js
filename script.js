// communicates to country api to retrieve all country data to display it on the page
async function retrieveCountryData(){
    var apiUrl = "https://restcountries.com/v3.1/all";
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad network response');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // for testing
            //displayData(data);
            populateCountriesDropdown(data);
        })
        .catch(error => {
            console.error('Error with fetch: ', error);
    });
}

//test function for displaying whole output of api request
function displayData(data){
    document.getElementById('apiOutput').textContent = JSON.stringify(data, null, 2);
}

//populate countries dropdown list
function populateCountriesDropdown(countriesData){
    const select = document.getElementById('countriesDropDown');

    countriesData.forEach(country => {
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
    console.log(`Selected country ID: ${countryName}`);
}

//document.getElementById('displayCountriesBtn').addEventListener('click', retrieveCountryData);
// Run this function when the page loads to fetch and display the country data
document.addEventListener('DOMContentLoaded', function() {
    retrieveCountryData();
});