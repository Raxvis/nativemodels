const required = require('./checks/required');

const requiredCheck = (schema, record) =>
  Object.keys(schema).forEach((key) => {
    required(schema[key], key, record[key]);
  });

module.exports = requiredCheck;
