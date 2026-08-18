const h1 = document.querySelector("#h1");
h1.textContent = "It is changed now";
h1.classList.toggle("active");

const cities = ["Harrar", "Hawassa", "Moyale"];
const cityList = document.querySelector("#cities");
cities.forEach(function (city) {
  const li = document.createElement("li"); //Your JavaScript can automatically create the new list.You don't have to manually change the HTML. we don't need to write html code
  //of the list cities only we need the class of cities and we can connect it with javascript so Imagine you have 1,000 cities.and JavaScript automatically creates all 1,000 <li> elements.
  li.textContent = city;
  cityList.append(li);
});

const container = document.querySelector("#container");
const button = document.querySelector("#myButton");

button.addEventListener("click", function (event) {
  console.log("clicked");
});

container.addEventListener("click", function () {
  console.log("Div listener");
});

const item = document.querySelector("#items");
item.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    event.target.parentElement.remove();
  }
});

const form = document.querySelector("#forms");
const inputs = document.querySelector("#input");
const allItem = document.querySelector("#itemList");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const value = inputs.value;

  const li = document.createElement("li");
  li.textContent = value;

  allItem.append(li);

  inputs.value = "";
});
