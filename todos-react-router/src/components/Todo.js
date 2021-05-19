import React from "react";
import "../styles/Todo.css";
import CompletedOn from "./CompletedOn";

const Todo = (props) => {
  console.log(props);

  const handleClick = (e) => {
    e.preventDefault();

    props.handleToggle(props.todo.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(props.todo.id);
    props.deleteTodo(props.todo.id);
  };
  // console.log(props.todo.completedOn);
  return (
    <div key={props.todo.id}>
      <p
        className={props.todo.completed ? "completed" : ""}
        onClick={handleClick}
      >
        {props.todo.task}
      </p>
      {props.todo.completed && (
        <CompletedOn
          key={props.todo.id}
          data={props.todo.completedOn.currentTime}
          todo={props.todo}
        />
        // <p>Completed on {props.todo.completedOn.currentTime}</p>
      )}
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default Todo;
