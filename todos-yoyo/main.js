const yo = require("yo-yo");
// const filters = require("./Filters");

const tasks = [
  { text: "walk the dog", completed: false },
  { text: "learn yo-yo", completed: true },
  { text: "clean garage", completed: false },
];

const el = list(tasks, update);

const tasksDiv = document.getElementById("tasks-div");
const showAll = document.getElementById("show-all");
const showIncomplete = document.getElementById("show-incomplete");
const showComplete = document.getElementById("show-complete");

function list(tasks, onclick) {
  return yo`<div id="input-div">
  <input type="text" placeholder="Enter Task..." id="input-bar">
  <button onclick=${onclick} type="submit" id="input-btn">Add Task</button>
  <ul>
    ${tasks.map(function (task) {
      return yo`<li><span>${task.text}</span>
        <button onclick=${completedBtnHandler} id="completeBtn"><i class="far fa-check-circle"></i></button>
        <button onclick=${deleteBtnHandler} id="deleteBtn"><i class="fas fa-times-circle"></i></button></li>`;
    })}
    </ul></div>`;
}

function update() {
  const inputBar = document.getElementById("input-bar");
  const newTaskText = inputBar.value;
  tasks.push({ text: newTaskText, completed: false });
  console.table([tasks]);
  inputBar.value = "";

  var newList = list(tasks, update);
  yo.update(el, newList);
}

function completedBtnHandler() {
  task = this.parentElement;
  task.completed = true;
  yo.update(el, list(tasks, update));
  console.log(tasks);
}

function deleteBtnHandler() {
  deletedTask = this.parentElement;
  deletedTask.remove();
  // yo.update(el, list(tasks));
}

showAll.onclick = () => {
  filter = filterAll;
  yo.update(el, list(tasks));
};

showIncomplete.onclick = () => {
  filter = filterIncomplete;
  yo.update(el, list(tasks));
};

showComplete.onclick = () => {
  filter = filterComplete;
  yo.update(el, list(tasks));
};
const filterAll = (task) => true;
const filterComplete = (task) => task.completed;
const filterIncomplete = (task) => !task.completed;

tasksDiv.appendChild(el);

// showAll.onclick = () => {
//   filter = filterAll;
//   yo.update(el, newList);
// };

// showIncomplete.onclick = () => {
//   filter = filterIncomplete;
//   yo.update(el, newList);
// };

// showComplete.onclick = () => {
//   filter = filterComplete;
//   yo.update(el, newList);
// };

let filter = filterAll;

// inputBtn.addEventListener("click", function () {
//   const newTaskText = inputBar.value;
//   tasks.push({ text: newTaskText, completed: false });
//   console.log(newTaskText);
// });
