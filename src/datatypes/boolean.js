const createType = require('./../createType');
const { isBoolean, isUndefined } = require('./../lib/checks/types');

const boolean = () =>
  createType({
    name: 'boolean',
    parse: (key, value) => Boolean(value),
    requiredCheck: (key, value) => {
      if (isUndefined(value) || value === '' || value === null) {
        throw new Error(`NativeModels - Property: '${key}' is required`);
      }

      return true;
    },
    strictCheck: (key, value) => {
      if (isBoolean(value)) {
        return true;
      }

      throw new Error(`NativeModels - Property ${key} is not a boolean`);
    },
  });

module.exports = boolean;
