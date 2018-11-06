const invalidTypeCheck = require('./checks/invalidType');

const checks = {
	required: require('./checks/required'),
	strict: require('./checks/strict'),
	valid: require('./checks/valid'),
};

const runChecks = (type, key, value) => {
	Object.keys(checks).forEach((name) => {
		if (!checks[name](type, key, value)) {
			throw new Error(`Failed ${name} check.  Key: ${key} | Value: ${value}`);
		}
	});
};

const parseValue = (type, key, value) => {
	if (type.allowNull && (value === null || value === undefined)) {
		return null;
	} else if (invalidTypeCheck(type, key, value)) {
		return value;
	}

	runChecks(type, key, value);

	return type.parse(key, value);
};

module.exports = parseValue;
