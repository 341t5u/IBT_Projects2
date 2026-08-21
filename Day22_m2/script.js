const API_URL = "https://open.er-api.com/v6/latest/ETB";

const state = {
  rates: {},
  watchlist: [],
  baseCurrency: "ETB",
};

const statusEl = document.querySelector("#status");
const currencyEl = document.querySelector("#currency");
const amountEl = document.querySelector("#amount");
const formEl = document.querySelector("#convert-form");
const resultEl = document.querySelector("#result");
const watchlistEl = document.querySelector("#watchlist");

async function loadRates() {
  statusEl.textContent = "Loading exchange rates...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("API returned an error");
    }

    state.rates = data.rates;

    statusEl.textContent = "Exchange rates loaded successfully.";

    renderCurrencies();
    renderWatchlist();
  } catch (error) {
    console.error(error);

    statusEl.textContent = "Unable to load exchange rates. Please try again.";
  }
}

function renderCurrencies() {
  currencyEl.innerHTML = "";

  const currencies = Object.keys(state.rates)
    .filter(function (currency) {
      return currency !== "ETB";
    })
    .sort();

  currencies.forEach(function (currency) {
    const option = document.createElement("option");

    option.value = currency;
    option.textContent = currency;

    currencyEl.appendChild(option);
  });
}

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(amountEl.value);
  const currency = currencyEl.value;

  if (!amount || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount.";

    return;
  }

  if (!currency) {
    resultEl.textContent = "Please select a currency.";

    return;
  }

  const rate = state.rates[currency];

  if (!rate) {
    resultEl.textContent = "Exchange rate not available.";

    return;
  }

  const convertedAmount = amount * rate;

  resultEl.innerHTML = `
    <p>
      ${amount.toLocaleString()} ETB =
      <strong>
        ${convertedAmount.toFixed(2)} ${currency}
      </strong>
    </p>

    <button id="add-watchlist">
      Add to Watchlist
    </button>
  `;

  document
    .querySelector("#add-watchlist")
    .addEventListener("click", function () {
      addToWatchlist(currency);
    });
});

function addToWatchlist(currency) {
  if (!currency) {
    return;
  }

  if (state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);

  saveState();
  renderWatchlist();
}

function renderWatchlist() {
  watchlistEl.innerHTML = "";

  if (state.watchlist.length === 0) {
    watchlistEl.innerHTML = `
      <li>No currencies in your watchlist.</li>
    `;

    return;
  }

  state.watchlist.forEach(function (currency) {
    const rate = state.rates[currency];

    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        <strong>${currency}</strong>
        <small>
          1 ETB = ${rate ? rate : "Loading..."}
        </small>
      </span>

      <button
        class="delete-btn"
        data-currency="${currency}"
      >
        Delete
      </button>
    `;

    watchlistEl.appendChild(li);
  });
}

watchlistEl.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const currency = event.target.dataset.currency;

  state.watchlist = state.watchlist.filter(function (item) {
    return item !== currency;
  });

  saveState();
  renderWatchlist();
});

function saveState() {
  localStorage.setItem("birrWatch", JSON.stringify(state.watchlist));
}

function loadState() {
  const savedWatchlist = localStorage.getItem("birrWatch");

  if (!savedWatchlist) {
    return;
  }

  try {
    state.watchlist = JSON.parse(savedWatchlist);
  } catch (error) {
    console.error("Could not load watchlist:", error);

    state.watchlist = [];
  }
}

loadState();
renderWatchlist();
loadRates();
