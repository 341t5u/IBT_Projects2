const form = document.querySelector("#country-form");
const input = document.querySelector("#country-input");
const out = document.querySelector("#facts");

// ------------------------------------
// Render one fact
// ------------------------------------

function render(parent, label, value) {
  const row = document.createElement("div");

  row.className = "fact";

  const labelElement = document.createElement("strong");
  labelElement.textContent = label;

  const valueElement = document.createElement("span");
  valueElement.textContent = value;

  row.appendChild(labelElement);
  row.appendChild(valueElement);

  parent.appendChild(row);
}

// ------------------------------------
// Fetch and display country
// ------------------------------------

async function showCountry(name) {
  // LOADING STATE
  out.textContent = "Loading...";
  out.className = "loading";

  try {
    const countryName = encodeURIComponent(name.trim());

    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    const res = await fetch(url);

    // HTTP ERROR
    if (!res.ok) {
      throw new Error("Country not found");
    }

    const countries = await res.json();

    // Take the first matching country
    const country = countries[0];

    // SUCCESS STATE
    out.innerHTML = "";
    out.className = "";

    // Flag
    const flag = document.createElement("img");

    flag.className = "flag";

    flag.src = country.flags.svg;
    flag.alt = `${country.name.common} flag`;

    out.appendChild(flag);

    // Country name
    const title = document.createElement("h2");

    title.textContent = country.name.common;

    title.style.textAlign = "center";
    title.style.marginBottom = "20px";

    out.appendChild(title);

    // Capital
    const capital = country.capital?.[0] || "N/A";

    render(out, "Capital", capital);

    // Population
    render(out, "Population", country.population.toLocaleString());

    // Region
    render(out, "Region", country.region || "N/A");

    // Currencies
    let currencies = "N/A";

    if (country.currencies) {
      currencies = Object.values(country.currencies)
        .map((currency) => {
          return `${currency.name} (${currency.symbol || ""})`;
        })
        .join(", ");
    }

    render(out, "Currencies", currencies);
  } catch (error) {
    // ERROR STATE
    out.textContent = error.message;
    out.className = "error";
  }
}

// ------------------------------------
// Search event
// ------------------------------------

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const countryName = input.value.trim();

  if (!countryName) {
    return;
  }

  showCountry(countryName);
});

// ------------------------------------
// DEFAULT COUNTRY
// ------------------------------------

showCountry("Ethiopia");
