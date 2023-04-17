const defaultValue = require('./defaultValue');
const isNullOrUndefined = require('./isNullOrUndefined');

const defaultRecord = (schema, record) => ({
  ...record,
  ...Object.keys(schema).reduce(
    (result, key) => ({
      ...result,
      ...(schema[key].hasDefault
        ? { [key]: isNullOrUndefined(record[key]) ? defaultValue(schema[key].defaultValue) : record[key] }
        : {}),
    }),
    {},
  ),
});

module.exports = defaultRecord;
