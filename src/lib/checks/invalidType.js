const invalidTypeCheck = (type, key) => {
	if (!type.validate || !type.parse) {
		console.log(`Schema Key: '${key}' is not a valid datatype or customtype`);

		return true;
	}

	return false;
};

module.exports = invalidTypeCheck;
