const Joi = require("@hapi/joi");

class Genre {
  constructor(name) {
    this.name = name;
  }
}

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required()
  });
  return schema.validate(genre);
};

exports.Genre = Genre;
exports.validate = validateGenre;
