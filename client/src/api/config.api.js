import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

export const ROUTES = Object.freeze({
  READ_ALL: "/todos",
  CREATE: "/todos",
  EDIT: id => `/todos/${id}`,
  DELETE: id => `/todos/${id}`
});
