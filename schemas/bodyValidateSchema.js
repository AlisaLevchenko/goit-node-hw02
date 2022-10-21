const createError = require("../helpers/createError");

function bodyValidateSchema(schema, body) {
  const { error } = schema.validate(body);
  if (error) {
    // if (
    //   error.message ===
    //   '"value" must contain at least one of [name, email, phone]'
    // )
    //   error.message = "missing fields";
    throw createError(400, error.message);
  }
}

module.exports = { bodyValidateSchema };
