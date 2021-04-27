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
