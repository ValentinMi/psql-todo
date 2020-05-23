const moment = require("moment");
const Joi = require("@hapi/joi");

class Todo {
  constructor(description) {
    this.description = description;
    this.creationDate = moment();
  }
}

const validateTodo = todo => {
  const schema = Joi.object({
    description: Joi.string().min(1).max(255).required()
  });

  return schema.validate(todo);
};

exports.Todo = Todo;
exports.validate = validateTodo;
