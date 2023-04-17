const buildType = require('./build');
const extendType = require('./extend');

module.exports = (value, types, fns) => {
  if (typeof value === 'string') {
    if (types[value]) {
      return types[value]();
    }

    throw new Error(`NativeModels - ${value} is not a valid type`);
  } else if (types[value.type]) {
    const type = buildType(value, types, fns);

    return extendType(value, type, fns);
  }

  throw new Error(`NativeModels - ${value} is not a valid type`);
};
