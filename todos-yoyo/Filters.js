const yo = require("yo-yo");

const showAll = document.getElementById("show-all");
const showIncomplete = document.getElementById("show-incomplete");
const showComplete = document.getElementById("show-complete");

showAll.onclick = (task) => {
  filter = filterAll;
  
};

showIncomplete.onclick = (task) => {
  filter = filterIncomplete;
  yo.update(task, newList);
};

showComplete.onclick = (task) => {
  filter = filterComplete;
  
};

const filterAll = (task) => true;
const filterComplete = (task) => task.completed;
const filterIncomplete = (task) => !task.completed;

let filter = filterAll;

module.exports = { showAll, showIncomplete, showComplete };
