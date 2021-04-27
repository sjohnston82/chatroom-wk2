(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./CreateItem.js":2}],2:[function(require,module,exports){
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

},{"./CompleteItem.js":1,"./DeleteItem.js":3}],3:[function(require,module,exports){
const deleteItem = function () {
  const deletedItem = this.parentElement;
  deletedItem.remove();
};

module.exports = deleteItem;

},{}],4:[function(require,module,exports){
const taskList = document.getElementById("task-list");

function showAll() {
  const tasks = [...taskList.children];
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = "block";
  }
}

function showIncomplete() {
  showAll();
  const tasks = [...taskList.children];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].className == "complete") {
      tasks[i].style.display = "none";
    }
  }
}

function showComplete() {
  showAll();
  const tasks = [...taskList.children];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].className == "incomplete") {
      tasks[i].style.display = "none";
    }
  }
}

module.exports = { showAll, showIncomplete, showComplete };

},{}],5:[function(require,module,exports){
document.addEventListener("DOMContentLoaded", function () {
  const createItem = require("./CreateItem.js");
  const { showAll, showIncomplete, showComplete } = require("./Filters.js");
 
  const inputBtn = document.getElementById("input-btn");
  const showAllBtn = document.getElementById("show-all");
  const showIncompleteBtn = document.getElementById("show-incomplete");
  const showCompleteBtn = document.getElementById("show-complete");
  
  inputBtn.addEventListener("click", createItem);

  showAllBtn.addEventListener("click", showAll);
  showIncompleteBtn.addEventListener("click", showIncomplete);
  showCompleteBtn.addEventListener("click", showComplete);
});

},{"./CreateItem.js":2,"./Filters.js":4}]},{},[5]);
