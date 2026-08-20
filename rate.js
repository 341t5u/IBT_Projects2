async function getUsdToEtbRate() {
  const url = "https://open.er-api.com/v6/latest/USD";

  try {
    const res = await fetch(url);

    // fetch() does NOT automatically throw for HTTP errors.
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    return data.rates.ETB;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error.message);
  }
}

async function main() {
  const rate = await getUsdToEtbRate();

  if (rate !== undefined) {
    console.log(`1 USD = ${rate} ETB`);
  }
}

main();
