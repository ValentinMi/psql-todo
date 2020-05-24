const express = require("express");
const todos = require("../routes/todos.routes");
const genres = require("../routes/genres.routes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/todos", todos);
  app.use("/api/genres", genres);
};
