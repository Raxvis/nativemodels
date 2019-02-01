/* eslint-disable max-params */
const invalidTypeCheck = require('./checks/invalidType');
const { isNull } = require('./checks/types');

const checks = {
	required: require('./checks/required'),
	strict: require('./checks/strict'),
	valid: require('./checks/valid'),
};

const runChecks = (type, key, value) => {
	Object.keys(checks).forEach((name) => {
		if (!checks[name](type, key, value)) {
			throw new Error(`NativeModels - Failed ${name} check.  Key: ${key} | Value: ${value}`);
		}
	});
};

const parseValue = (type, key, value, allowNulls) => {
	if ((type.allowNull || allowNulls) && isNull(value)) {
		return null;
	} else if (invalidTypeCheck(type, key, value)) {
		return value;
	}

	runChecks(type, key, value);

	const parsedValue = type.parse(key, value);

	return type.transformFn ? type.transformFn(parsedValue) : parsedValue;
};

module.exports = parseValue;
