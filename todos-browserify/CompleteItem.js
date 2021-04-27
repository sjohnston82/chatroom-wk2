const createItem = require("./CreateItem.js");

function completeItem() {
  var date = new Date();
  var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  console.log(dateStr);

  var completedTask = this.parentElement;
  const time = document.createElement("p");
  time.innerText = dateStr;
  completedTask.appendChild(time);

  completedTask.classList.toggle("incomplete");
  completedTask.classList.toggle("complete");
  completedTask.style.textDecoration = "line-through";
  time.style.textDecoration = "none";
}

module.exports = completeItem;
