const createType = require('./../createType');

const nonStrictCheck = (value) =>
	typeof value !== 'boolean' && value !== '' && !isNaN(parseInt(value)) && parseInt(value) === parseFloat(value);

const isValidInt = (key, value, strict = false) => {
	if (typeof value === 'number' && parseInt(value) === parseFloat(value)) {
		return true;
	}

	if (!strict && nonStrictCheck(value)) {
		return true;
	}

	throw new Error(`Property ${key} is not an int`);
};

const int = () =>
	createType({
		name: 'int',
		parse: (key, value) => parseInt(value),
		requiredCheck: (key, value) => {
			if (value || value === 0) {
				return true;
			}

			throw new Error(`Property: '${key}' is required`);
		},
		strictCheck: (key, value) => isValidInt(key, value, true),
		validCheck: (key, value) => isValidInt(key, value),
	});

module.exports = int;
