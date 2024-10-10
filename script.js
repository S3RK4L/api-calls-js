document.getElementById('displayCountriesBtn').addEventListener('click', retrieveCountryData);

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
            displayData(data);
        })
        .catch(error => {
            console.error('Error with fetch: ', error);
    });
}

function displayData(data){
    document.getElementById('apiOutput').textContent = JSON.stringify(data, null, 2);
}