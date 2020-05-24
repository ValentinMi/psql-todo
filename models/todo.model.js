const moment = require("moment");
const Joi = require("@hapi/joi");

class Todo {
  constructor(description, genre_id) {
    this.description = description;
    this.creationDate = moment();
    this.genre_id = genre_id;
  }
}

const validateTodo = todo => {
  const schema = Joi.object({
    description: Joi.string().min(1).max(255).required(),
    genre_id: Joi.number().integer().min(0).required()
  });

  return schema.validate(todo);
};

exports.Todo = Todo;
exports.validate = validateTodo;
