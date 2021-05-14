import React, { useState } from "react";

const NewTodo = (props) => {
  const [newTodo, setNewTodo] = useState({
    task: "",
    completed: false,
    id: "",
    completedOn: null,
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    let newId = props.todos.length + 1;
    console.log(newId);
    setNewTodo({ task: value, completed: false, id: newId, completedOn: null });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(newTodo);
    props.postTodos(newTodo.task, newTodo.completed, newTodo.id);
    setNewTodo({ task: "" });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={newTodo.task}
          name="newTodo"
        />
        <button>Add Todo</button>
      </form>
    </div>
  );
};

export default NewTodo;
