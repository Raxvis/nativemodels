const parseValue = (type, key, value) => {
	if (type.allowNull && value === null) {
		return null;
	}

	if (!type.validate || !type.parse) {
		console.warn(`Schema Key: '${key}' is not a valid datatype or customtype`);

		return value;
	} else if (type.validate(value, key)) {
		return type.parse(value, key);
	}

	throw new Error(`Failed to validate ${key} with value of ${value}`);
};

module.exports = parseValue;
