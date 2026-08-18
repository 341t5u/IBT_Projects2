const form = document.querySelector("#add-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
let total = 0;
function addRow(name, price) {
  const li = document.createElement("li");
  li.dataset.price = price;
  const text = document.createElement("span");
  text.textContent = `${name} - ${price} ETB`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("del");
  li.append(text, deleteButton);
  list.append(li);
}
function updateTotal() {
  let sum = 0;
  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    sum += Number(item.dataset.price);
  });
  totalEl.textContent = sum;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const n = name.value.trim();
  const p = Number(price.value);
  if (!n || !p) return;
  addRow(n, p);
  form.reset();
  updateTotal();
});

list.addEventListener("click", (e) => {
  // delegation
  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
    updateTotal();
  } else if (e.target.matches("li")) {
    e.target.classList.toggle("bought");
  }
});
