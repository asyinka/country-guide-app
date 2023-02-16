
let countryInput = document.querySelector("#country-input");
let submitButton =  document.querySelector("#country-search-button");

// https://restcountries.com/v3.1/name/${countryName}?fullText=true

submitButton.addEventListener('click', handleSubmitButton);

async function handleSubmitButton() {
    let countrySearch = countryInput.value;
    let searchUrl = `https://restcountries.com/v3.1/name/${countrySearch}?fullText=true`;

    let result = await fetch(searchUrl)
    let searchResult = await result.json();
    let resultBase = searchResult[0]; //this is just for testing and practicin

    console.log(searchResult);
    // console.log(searchResult[0].flags.svg);

    try {
        resultsContainer.innerHTML = `
        <div class="imageBox">
            <img src="${searchResult[0].flags.svg}" alt="${searchResult[0].flags.alt}">
            <img src="${searchResult[0].coatOfArms.svg}" alt="This is the coat of arms for ${searchResult[0].name.common}">
        </div>
        <h2 id="officialName">Official Name - ${resultBase.name.official}</h2>

        <div class="wrapper">
            <h3>Common Name:</h3>
            <span>${resultBase.name.common}</span>
        </div>

        <div class="wrapper">
            <h3>Capital:</h3>
            <span>${resultBase.capital}</span>
        </div>
        <div class="wrapper">
            <h3>Continent:</h3>
            <span>${searchResult[0].continents}</span>
        </div>

         <div class="wrapper">
            <h3>Population:</h3>
            <span>${searchResult[0].population}</span>
        </div>

        <div class="wrapper">
            <h3>Official Currency:</h3>
            <span>${searchResult[0].currencies[Object.keys(searchResult[0].currencies)].name}
                - ${Object.keys(searchResult[0].currencies)}</span>
        </div>

        <div class="wrapper">
            <h3>Common Language(s):</h3>
            <span>${Object.values(searchResult[0].languages).toString().split(',').join(', ')}</span>
        </div>
    `;

    } catch (error) {
        if (countrySearch.length == 0) {
            resultsContainer.innerHTML = `
            <div class="wrapper">
                <h3 id="errorText">Input the name of a country</h3>
            </div>
            `
        } else {
            resultsContainer.innerHTML = `
            <div class="wrapper">
                <h3 id="errorText">The input is not a valid name of a country</h3>
            </div>`
        }
    }
    
}