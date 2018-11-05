const invalidTypeCheck = require('./checks/invalidType');
const requiredCheck = require('./checks/required');
const strictCheck = require('./checks/strict');
const validCheck = require('./checks/valid');

const parseValue = (type, key, value) => {
	if (type.allowNull && value === null) {
		return null;
	}

	if (invalidTypeCheck(type, key, value)) {
		return value;
	}

	strictCheck(type, key, value);
	requiredCheck(type, key, value);
	validCheck(type, key, value);

	return type.parse(key, value);
};

module.exports = parseValue;
