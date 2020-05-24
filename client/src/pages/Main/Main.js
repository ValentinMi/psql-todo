import React, { useEffect, useReducer } from "react";
import "./Main.scss";
import Table from "../../components/Table/Table";
import {
  getTodos,
  postTodo,
  updateTodo,
  removeTodo
} from "../../api/todos.api";

const Main = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });

  useEffect(() => {
    dispatch({ type: "readAll" });
  }, []);

  return (
    <div className="main container">
      <h1 className="main__title">Welcome in your favorite todo list</h1>
      <Table todos={todos} dispatch={dispatch} />
    </div>
  );
};

async function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "readAll":
      const todos = await getTodos();
      console.log(todos);
      return { ...state, todos };

    case "create":
      await postTodo(payload);
      return { ...state, todos: [...todos, payload] };

    case "update":
      await updateTodo(payload.todoID, payload.updatedTodo);
      const updatedTodos = todos.map(todo => {
        if (todo.todo_id === payload.todoID) return payload.updatedTodo;
        return todo;
      });
      return { ...state, todos: updatedTodos };

    case "delete":
      await removeTodo(payload);
      const newTodos = todos.filter(todo => {
        if (todo.todo_id !== payload) return todo;
        return false;
      });
      return { ...state, todos: newTodos };

    default:
      return state;
  }
}

export default Main;
