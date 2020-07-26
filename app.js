// Select our DOM elements

const form = document.querySelector("#form");
let input = document.querySelector("#input");
let header = document.querySelector("#header");
const button = document.querySelector("#button");
const global = document.querySelector("#global");
const tableArea = document.querySelector("#table");
const tableDiv = document.querySelector("#table-div");
const tableBody = document.querySelector("#table-body");
const allCountries = document.querySelector("#all-countries");

// Event Listeners

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const country = input.value;

    // Fetch by country

    fetch(`https://api.covid19api.com/country/${country}`)
        .then((res) => res.json())
        .then((data) => {
            data = data[data.length - 1];
            if (data !== undefined) {
                header.style.display = "none";
                input.value = "";
                tableDiv.style.visibility = "visible";
                tableBody.innerHTML = `
             <tr>
             <th style="text-transformation: capitalize" scope="row">${data.Country}</th>
             <td>${data.Deaths}</td>
             <td>${data.Confirmed}</td>
             <td>${data.Active}</td>
             <td>${data.Recovered}</td>
             </tr>
            `;
            } else {
                tableDiv.style.visibility = "hidden";
                header.style.display = "block";
                header.textContent = "Country Not Found...Try again!";
            }
        });
});

// Fetch Global

global.addEventListener("click", () => {
    fetch("https://api.covid19api.com/summary")
        .then((res) => res.json())
        .then((data) => {
            data = data.Global;
            header.style.display = "none";
            input.value = "";
            tableDiv.style.visibility = "visible";
            tableBody.innerHTML = `
            <tr>
             <th style="text-transformation: capitalize" scope="row">Global</th>
             <td>${data.TotalDeaths}</td>
             <td>${data.TotalConfirmed}</td>
             <td>uknown</td>
             <td>${data.TotalRecovered}</td>
             </tr>
            
             
            `;
        });
});

// Fetch All Countries

allCountries.addEventListener("click", () => {
    fetch("https://api.covid19api.com/summary")
        .then((res) => res.json())
        .then((data) => {
            data = data.Countries;
            header.style.display = "none";
            input.value = "";
            tableDiv.style.visibility = "visible";
            const countriesArr = [];
            tableBody.innerHTML = data
                .map((country) => {
                    return `<tr>
                <th scope="row">${country.Country}</th>
                <td>${country.TotalDeaths}</td>
                <td>${country.TotalConfirmed}</td>
                <td>uknown</td>
                <td>${country.TotalRecovered}</td>
                </tr>
                
                `;
                })
                .join("");
        });
});
