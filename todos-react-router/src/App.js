import "./App.css";
import React, { useState } from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import NewTodo from "./components/NewTodo";

function App() {
  const [todos, setTodos] = useState([
    { task: "Make todos list", completed: true, id: 1 },
    { task: "Feed the raccoons", completed: true, id: 2 },
    { task: "Feed the goats", completed: false, id: 3 },
    { task: "Feed the elk", completed: false, id: 4 },
    { task: "Feed the alligators", completed: false, id: 5 },
    { task: "Feed the kitties", completed: false, id: 6 },
    { task: "Feed the gerbils", completed: false, id: 7 },
    { task: "Feed the stegosaurus", completed: true, id: 8 },
  ]);

  const handleToggle = (id) => {
    let toggled = todos.map((todo) => {
      return todo.id === Number(id)
        ? { ...todo, completed: !todo.completed }
        : { ...todo };
    });
    console.log(toggled);
    setTodos(toggled);
  };

  return (
    <div className="App">
      <Header />
      <NewTodo todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} handleToggle={handleToggle} />
    </div>
  );
}

export default App;
