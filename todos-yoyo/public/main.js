const Todos = require("../todo").Todos;
const yo = require("yo-yo");

const todos = [];
getTodos();

const todoDiv = document.getElementById("todos");
const todoInput = document.getElementById("todo-input");
const addTodo = document.getElementById("add-todo");
const showAll = document.getElementById("all");
const showCompleted = document.getElementById("completed");
const showIncomplete = document.getElementById("incomplete");

showAll.onclick = () => {
  filter = filterAll;
  update();
};

showCompleted.onclick = () => {
  filter = filterCompleted;
  update();
};

showIncomplete.onclick = () => {
  filter = filterIncomplete;
  update();
};

const filterAll = (todo) => true;
const filterCompleted = (todo) => todo.completed;
const filterIncomplete = (todo) => !todo.completed;

let filter = filterAll;

addTodo.onsubmit = (event) => {
  event.preventDefault();

  const newTodoText = todoInput.value;
  todos.push({ text: newTodoText, completed: false });
  update();
};

function update() {
  yo.update(el, Todos(todos, filter, update));
}

const el = Todos(todos, filter, update);
todoDiv.appendChild(el);

function getTodos() {
  fetch("http://localhost:8000", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => todos.push(data));
}
