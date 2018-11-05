const base = require('./base');

const int = () => ({
	...base,
	parse: (key, value) => parseInt(value),
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

		throw new Error(`Property ${key} is not an int`);
	},
	validate: (key, value) => {
		if (
			value !== true &&
			value !== false &&
			value !== '' &&
			!isNaN(parseInt(value)) &&
			parseInt(value) === parseFloat(value)
		) {
			return true;
		}

		throw new Error(`Property ${key} is not an int`);
	},
});

module.exports = int;
