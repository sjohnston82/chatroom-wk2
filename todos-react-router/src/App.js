import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import NewTodo from "./components/NewTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    return fetch("http://localhost:8000", {
      method: "GET",
      headers: { "Access-Control-Allow-Origin": "no-cors" },
    })
      .then((res) => res.json())
      .then((data) => {
        // setTodos([{ data }]);
        console.log(data);
        setTodos(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function postTodos(task, completed, id) {
    console.log("posting todo");
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        completed: completed,
        completedOn: null,
        id: id,
      }),
    })
      .then((data) => {
        console.log("Success:", data);
        getTodos();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleRemove = (id) => {
    setTodos([{ todos: todos.filter((todo) => todo.id !== id) }]);
  };

  useEffect(() => {
    getTodos();
  }, []);
  const handleToggle = (id) => {
    let toggled = todos.map((todo) => {
      return todo.id === Number(id)
        ? {
            ...todo,
            completed: !todo.completed,
            completedOn: { currentTime: new Date().toLocaleString() },
          }
        : { ...todo };
    });
    console.log(toggled);
    setTodos(toggled);
  };

  return (
    <div className="App">
      <Header />
      <NewTodo todos={todos} setTodos={setTodos} postTodos={postTodos} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        handleToggle={handleToggle}
        handleRemove={handleRemove}
      />
    </div>
  );
}

export default App;
