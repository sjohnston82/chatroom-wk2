import React from "react";
import "../Todo.css";

const Todo = (props) => {
  console.log(props.todo);

  const handleClick = (e) => {
    e.preventDefault();

    props.handleToggle(props.todo.id);
  };
  return (
    <div>
      <p
        className={props.todo.completed ? "completed" : ""}
        onClick={handleClick}
      >
        {props.todo.task}
      </p>
    </div>
  );
};

export default Todo;
