const createModel = require('./createModel');
const createType = require('./createType');
const customtypes = require('./customtypes');
const datatypes = require('./datatypes');
const generateSchema = require('./generateSchema');
const resolve = require('./resolve');

/* istanbul ignore next */
const resolver = (data, schema) =>
  console.warn('DEPRECATION NOTICE: Please use resolve() instead of resolver()') || resolve(data, schema);

module.exports = {
  createModel,
  createType,
  customtypes,
  datatypes,
  generateSchema,
  resolve,
  resolver,
};
