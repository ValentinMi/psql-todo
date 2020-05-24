import React from "react";
import Todo from "../Todo/Todo";

const Table = ({ todos, dispatch }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Description</th>
          <th scope="col">Creation date</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos && todos.map(todo => <Todo todo={todo} dispatch={dispatch} />)}
      </tbody>
    </table>
  );
};

export default Table;
