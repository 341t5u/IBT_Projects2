// ------------------------------------
// TEST 1: Deliberately wrong URL
// ------------------------------------

async function testWrongUrl() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/WRONG-URL-12345",
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("Catch block ran!");
    console.log("Error:", error.message);
  }
}

// ------------------------------------
// TEST 2: Real URL that returns 404
// ------------------------------------

async function test404() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users/999999",
    );

    console.log("Response received.");
    console.log("Status:", res.status);
    console.log("res.ok:", res.ok);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (error) {
    console.log("404 catch block ran!");
    console.log("Error:", error.message);
  }
}

// Run both tests
testWrongUrl();
test404();
