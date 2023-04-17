const parseValue = require('./parseValue');

const parseRecord = (schema, record, options) =>
  Object.keys(record).reduce(
    (result, key) => ({
      ...result,
      ...(schema[key] ? { [key]: parseValue(schema[key], key, record[key], options) } : {}),
    }),
    {},
  );

module.exports = parseRecord;
