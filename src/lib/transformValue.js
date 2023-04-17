const transformValue = (type, value, key) =>
  type.transforms && type.transforms[key] ? type.transforms[key](value) : value;

module.exports = transformValue;
