const defaultValue = require('./defaultValue');

const defaultRecord = (schema, record) => ({
  ...record,
  ...Object.keys(schema).reduce(
    (result, key) => ({
      ...result,
      ...(schema[key].hasDefault ? { [key]: record[key] || defaultValue(schema[key].defaultValue) } : {}),
    }),
    {},
  ),
});

module.exports = defaultRecord;
