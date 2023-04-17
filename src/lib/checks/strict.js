const strictCheck = (type, key, value) =>
  type.requireStrict && type.strictCheck ? type.strictCheck(key, value) : true;

module.exports = strictCheck;
