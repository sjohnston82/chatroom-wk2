const Todo = require("./todo");

module.exports = function (todos, domElement, render, filter) {
  // clear the currently rendered lis
  // domElement.innerHTML = ''

  // render the new list
  todos
    .filter(filter)
    .map((todo) => Todo(todo, render))
    .forEach((todo_li) => domElement.appendChild(todo_li));
};
