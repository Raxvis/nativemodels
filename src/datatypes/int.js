const createType = require('./../createType');

const isValidInt = (key, value, strict = false) => {
	if (Number.isInteger(value)) {
		return true;
	}

	if (!strict && Number.isInteger(parseInt(value)) && parseInt(value) === parseFloat(value)) {
		return true;
	}

	throw new Error(`NativeModels - Property ${key} is not an int`);
};

const int = () =>
	createType({
		name: 'int',
		parse: (key, value) => parseInt(value),
		requiredCheck: (key, value) => {
			if (value || value === 0) {
				return true;
			}

			throw new Error(`NativeModels - Property: '${key}' is required`);
		},
		strictCheck: (key, value) => isValidInt(key, value, true),
		validCheck: (key, value) => isValidInt(key, value),
	});

module.exports = int;
