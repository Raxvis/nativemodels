const parseValue = (type, key, value) => {
	if (type.allowNull && value === null) {
		return null;
	}

	if (type.validate(value, key)) {
		return type.parse(value, key);
	}

	throw new Error(`Failed to validate ${key} with value of ${value}`);
};

module.exports = parseValue;
