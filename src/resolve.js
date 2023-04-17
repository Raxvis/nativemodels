/* eslint-disable no-use-before-define */
const { isArray, isObject } = require('./lib/checks/types');
const createModel = require('./createModel');

const cascadeResolve = (value) => {
  if (isArray(value)) {
    return Promise.all(value.map(cascadeResolve));
  } else if (isObject(value) && !value.then) {
    return resolve(value);
  }

  return value;
};

const resolved = (keys, values, schema) => {
  const data = keys.reduce((result, key, index) => ({ ...result, [key]: values[index] }), {});

  return schema ? createModel(schema)(data) : data;
};

const resolve = (data, schema) => {
  const keys = Object.keys(data);

  return Promise.all(keys.map((key) => cascadeResolve(data[key]))).then((values) => resolved(keys, values, schema));
};

module.exports = resolve;
