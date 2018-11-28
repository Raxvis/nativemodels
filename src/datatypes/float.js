const createType = require('./../createType');

const isValidFloat = (key, value, strict = false) => {
	if (typeof value === 'number') {
		return true;
	}

	if (!strict) {
		if (!isNaN(parseFloat(value)) && value !== true && value !== false && value !== '') {
			return true;
		}
	}

	throw new Error(`Property ${key} is not a float`);
};

const float = () =>
	createType({
		name: 'float',
		parse: (key, value) => parseFloat(value),
		requiredCheck: (key, value) => {
			if (value || value === 0) {
				return true;
			}

			throw new Error(`Property: '${key}' is required`);
		},
		strictCheck: (key, value) => isValidFloat(key, value, true),
		validCheck: (key, value) => isValidFloat(key, value),
	});

module.exports = float;
