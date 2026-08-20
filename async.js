async function loadUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    render(data);
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

function render(data) {
  console.log("User:", data.name);
  console.log("Email:", data.email);
}

loadUser();
