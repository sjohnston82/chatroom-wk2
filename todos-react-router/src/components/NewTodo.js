import React, { useState } from "react";

const NewTodo = (props) => {
  const [newTodo, setNewTodo] = useState({
    task: "",
    completed: false,
    id: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    let newId = "_" + Math.random().toString(36).substr(2, 9);
    console.log(newId);
    setNewTodo({ task: value, completed: false, id: newId });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(newTodo);
    props.setTodos([...props.todos, newTodo]);
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
