const yo = require("yo-yo");

function Todo(todo, update) {
  return yo`<li>
    <span>${todo.text}</span>
    ${
      todo.completed
        ? ""
        : yo`<button onclick=${() => {
            todo.completed = true;
            update();
          }}>Done</button>`
    }
  </li>`;
}

function Todos(todos, filter, update) {
  return yo`<ul id="todo-list">
    ${todos.filter(filter).map((todo) => Todo(todo, update))}
  </ul>`;
}

module.exports = {
  Todo,
  Todos,
};
