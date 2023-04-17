const invalidTypeCheck = (type, key) => {
  if (!type.validCheck || !type.parse) {
    console.log(`Schema Key: '${key}' is not a valid datatype or customtype`);

    return true;
  }

  return false;
};

module.exports = invalidTypeCheck;
