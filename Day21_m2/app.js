const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";

  // Save theme choice
  localStorage.setItem("theme", theme);
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

function save(entries) {
  localStorage.setItem("signups", JSON.stringify(entries));
}

function load() {
  try {
    const data = localStorage.getItem("signups");

    // No data saved
    if (data === null) {
      return [];
    }

    const entries = JSON.parse(data);

    // Make sure the data is an array
    if (!Array.isArray(entries)) {
      return [];
    }

    return entries;
  } catch (error) {
    console.error("Could not load signups:", error);
    return [];
  }
}

const form = document.querySelector("#signupForm");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const error = document.querySelector("#error");

const count = document.querySelector("#count");

const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate(name, phone) {
  // Name validation
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  // Phone validation
  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  // Everything is valid
  return "";
}

function updateCount() {
  const entries = load();

  count.textContent = `${entries.length} people have signed up.`;
}

// Show count when page loads
updateCount();

form.addEventListener("submit", (event) => {
  // Prevent normal form submission
  event.preventDefault();

  // Read values and trim spaces
  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  // If validation fails
  if (message) {
    // Show specific error
    error.textContent = message;

    return;
  }

  const entries = load();

  entries.push({
    name: name,
    phone: phone,
  });

  save(entries);

  form.reset();

  error.textContent = "Signup successful!";

  updateCount();
});
