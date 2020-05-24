import { ROUTES } from "./config.api";
import axios from "axios";

export const getTodos = async () => {
  try {
    const { data } = await axios.get(ROUTES.READ_ALL);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const postTodo = async newTodo => {
  try {
    const { data } = axios.post(ROUTES.CREATE, newTodo);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTodo = async (todoID, updatedTodo) => {
  try {
    const { data } = axios.put(ROUTES.EDIT(todoID), updatedTodo);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeTodo = async todoID => {
  try {
    const { data } = axios.delete(ROUTES.DELETE(todoID));
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
