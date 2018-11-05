const requiredCheck = (type, key, value) => (type.isRequired ? type.requiredCheck(key, value) : true);

module.exports = requiredCheck;
