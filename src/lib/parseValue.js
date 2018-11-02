const strictCheck = (type, key, value) => {
	if (type.requireStrict && type.strictCheck) {
		type.strictCheck(value, key);
	}
};

const invalidTypeCheck = (type, key) => {
	if (!type.validate || !type.parse) {
		console.log(`Schema Key: '${key}' is not a valid datatype or customtype`);

		return true;
	}

	return false;
};

const parseValue = (type, key, value) => {
	if (type.allowNull && value === null) {
		return null;
	}

	strictCheck(type, key, value);

	if (invalidTypeCheck(type, key, value)) {
		return value;
	} else if (type.validate(value, key)) {
		return type.parse(value, key);
	}

	throw new Error(`Failed to validate ${key} with value of ${value}`);
};

module.exports = parseValue;
