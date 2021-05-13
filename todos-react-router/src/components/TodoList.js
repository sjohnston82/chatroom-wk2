import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Todo from "./Todo";
import "../TodoList.css";

const TodoList = (props) => {
  function All() {
    // console.log(props.todos);
    return props.todos.map((todo) => {
      // console.log(todo);
      return (
        <Todo
          key={todo.id}
          todos={props.todos}
          todo={todo}
          setTodos={props.setTodos}
          handleToggle={props.handleToggle}
        />
      );
    });
  }

  function Incomplete() {
    return props.todos
      .filter((todo) => !todo.completed)
      .map((todo) => {
        return (
          <Todo
            key={todo.id}
            todos={props.todos}
            todo={todo}
            setTodos={props.setTodos}
            handleToggle={props.handleToggle}
          />
        );
      });
  }

  function Completed() {
    return props.todos
      .filter((todo) => todo.completed)
      .map((todo) => {
        return (
          <Todo
            key={todo.id}
            todos={props.todos}
            todo={todo}
            setTodos={props.setTodos}
            handleToggle={props.handleToggle}
          />
        );
      });
  }
  return (
    <div >
      <Router>
        <div id="links">
          <Link id="link1" to="/">All</Link> 
          <Link id="link1" to="/incomplete">Incomplete</Link>
          <Link id="link1" to="/completed">Completed</Link>
        </div>

        <Switch>
          <Route exact path="/" component={All}>
            <All />
          </Route>

          <Route exact path="/incomplete" component={Incomplete}>
            <Incomplete />
          </Route>

          <Route exact path="/completed" component={Completed}>
            <Completed />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default TodoList;
