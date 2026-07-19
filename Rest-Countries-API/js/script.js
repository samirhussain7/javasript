import themeChanger from "./theme.js";
themeChanger();

async function getCountries() {
  const res = await fetch("./js/data.json");
  const result = await res.json();

  const container = document.querySelector(".main-container");

  result.forEach((country) => {
    const box = document.createElement("div");
    box.classList.add("box");
    let population = country.population.toLocaleString("en-IN");

    box.innerHTML = `
            <a href="country-detail.html?name=${country.name}"><img src=${country.flag} alt="${country.name} flag"></a>
            <h4>${country.name}</h4>
            <p class="population">Population: ${population}</p>
            <p class="region">Region: <span class="region-value">${country.region}<span/></p>
            <p class="capital">Capital: ${country.capital} </p>
        `;
    container.appendChild(box);
  });
}
getCountries();

function searchingFilterdCountry() {
  const input = document.querySelector("input");
  input.addEventListener("input", (e) => {
    const inputText = e.target.value.toLowerCase();
    const counriesH4 = document.querySelectorAll(".box h4");
    counriesH4.forEach((heading) => {
      const h4Text = heading.textContent.toLocaleLowerCase();
      if (h4Text.startsWith(inputText)) {
        heading.parentElement.style.display = "initial";
      } else {
        heading.parentElement.style.display = "none";
      }
    });
  });
}
searchingFilterdCountry();

function regionFilterdCountry() {
  const select = document.querySelector("#regions");
  select.addEventListener("change", (e) => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((elem) => {
      const regions = elem.querySelectorAll(".region .region-value");
      regions.forEach((region) => {
        if (region.textContent.toLowerCase() == e.target.value.toLowerCase()) {
          region.parentElement.parentElement.style.display = "initial";
        } else if (e.target.value == "all") {
          elem.style.display = "initial";
        } else {
          region.parentElement.parentElement.style.display = "none";
        }
      });
    });
  });
}
regionFilterdCountry();