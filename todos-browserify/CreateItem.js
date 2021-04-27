const completeItem = require("./CompleteItem.js");
const deleteItem = require("./DeleteItem.js");

const inputBar = document.getElementById("input-bar");
const taskList = document.getElementById("task-list");

function createItem() {
  const newTask = document.createElement("li");
  newTask.innerText = inputBar.value;
  newTask.classList.add("incomplete");
  newTask.id = "tasky";
  taskList.appendChild(newTask);

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="far fa-check-circle"></i>';
  completedBtn.setAttribute("id", "completedBtn");
  newTask.appendChild(completedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
  deleteBtn.setAttribute("id", "deleteBtn");
  newTask.appendChild(deleteBtn);

  

  inputBar.value = "";

  if (completedBtn) {
    completedBtn.addEventListener("click", completeItem);
  }
  deleteBtn.addEventListener("click", deleteItem);
}

module.exports = createItem;
