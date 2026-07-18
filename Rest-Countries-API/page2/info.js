import themeChanger from "../theme.js";
themeChanger()

document.querySelector('.back').addEventListener('click', () => {
  window.history.back()
})

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

async function showCountryDetails() {
  const response = await fetch("../data.json");
  const data = await response.json();

  const country = data.find((c) => c.name === countryName);

  const allInfo = document.querySelector(".all-details");
  allInfo.innerHTML = `
        <img src=${country.flag} alt="${country.name} flag">
        <div class="text-content">
            <h1>${country.name}</h2>
            <div class="country-info">
                <p><b>Native Name:</b> <span>${country.nativeName}</span></p>
                <p><b>Population:</b> <span>${country.population.toLocaleString("en-IN")}</span></p>
                <p><b>Region:</b> <span>${country.region}</span></p>
                <p><b>Sub Region:</b> <span>${country.subregion}</span></p>
                <p><b>Capital:</b> <span>${country.capital}</span></p>
                <p><b>Top Level Domain:</b> <span>${country.topLevelDomain[0]}</span></p>
                <p><b>Currencies:</b> <span>${country.currencies[0].code}</span></p>
                <p class="lang"><b>Language:</b> <span>${country.languages[0].name}</span></p>
            </div>
            <div class="border"><b>Border Countries:</b> <span class="border-country">${country.borders?.[0]}</span> <span class="border-country">${country.borders?.[1]}</span> <span class="border-country">${country.borders?.[2]}</span></div>
        </div>
    `;
}
showCountryDetails();
