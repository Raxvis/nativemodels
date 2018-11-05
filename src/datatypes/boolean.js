const base = require('./base');

const boolean = () => ({
	...base,
	parse: (key, value) => Boolean(value),
	requiredCheck(key, value) {
		if (typeof value === 'undefined' || value === '' || value === null) {
			throw new Error(`Property: '${key}' is required`);
		}

		return true;
	},
	strictCheck: (key, value) => {
		if (typeof value === 'boolean') {
			return true;
		}

		throw new Error(`Property ${key} is not a boolean`);
	},
});

module.exports = boolean;
