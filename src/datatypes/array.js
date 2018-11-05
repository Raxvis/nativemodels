const base = require('./base');
const parseValue = require('./../lib/parseValue');

const array = (type) => ({
	...base,
	parse: (key, values) => values.map((value) => parseValue(type, key, value)),
	validate: (key, value) => {
		if (Array.isArray(value)) {
			return true;
		}

		throw new Error(`Property ${key} is not an array`);
	},
});

module.exports = array;
