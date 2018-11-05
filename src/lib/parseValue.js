const invalidTypeCheck = require('./checks/invalidType');
const requiredCheck = require('./checks/required');
const strictCheck = require('./checks/strict');

const parseValue = (type, key, value) => {
	if (type.allowNull && value === null) {
		return null;
	}

	strictCheck(type, key, value);
	requiredCheck(type, key, value);

	if (invalidTypeCheck(type, key, value)) {
		return value;
	} else if (type.validate(key, value)) {
		return type.parse(key, value);
	}

	throw new Error(`Failed to validate ${key} with value of ${value}`);
};

module.exports = parseValue;
