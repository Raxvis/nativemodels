/* eslint-disable max-params */
const invalidTypeCheck = require('./checks/invalidType');
const { isNull } = require('./checks/types');
const transformValue = require('./transformValue');

const checks = {
  required: require('./checks/required'),
  strict: require('./checks/strict'),
  valid: require('./checks/valid'),
};

const runChecks = (type, key, value) => {
  Object.keys(checks).forEach((name) => {
    if (!checks[name](type, key, value)) {
      throw new Error(`NativeModels - Failed ${name} check.  Key: ${key} | Value: ${value}`);
    }
  });
};

const parseValue = (type, key, value, options) => {
  if (options.stripNulls && isNull(value)) {
    return undefined;
  } else if ((type.allowNull || (options && options.allowNulls)) && isNull(value)) {
    return null;
  } else if (invalidTypeCheck(type, key, value)) {
    return value;
  }

  runChecks(type, key, value);

  const parsedValue = type.parse(key, value, options && options.passOptions ? options : {});

  return transformValue(type, parsedValue, 'post');
};

module.exports = parseValue;
