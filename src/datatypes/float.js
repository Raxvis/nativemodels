const base = require('./base');

const float = () => ({
	...base,
	parse: (key, value) => parseFloat(value),
	requiredCheck(key, value) {
		if (value || value === 0) {
			return true;
		}

		throw new Error(`Property: '${key}' is required`);
	},
	strictCheck: (key, value) => {
		if (typeof value === 'number') {
			return true;
		}

		throw new Error(`Property ${key} is not a float`);
	},
	validCheck: (key, value) => {
		if (!isNaN(parseFloat(value)) && value !== true && value !== false && value !== '') {
			return true;
		}

		throw new Error(`Property ${key} is not a float`);
	},
});

module.exports = float;
