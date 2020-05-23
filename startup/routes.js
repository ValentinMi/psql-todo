const todos = require("../routes/todos.routes");

module.exports = function (app) {
  app.use("/api/todos", todos);
};
