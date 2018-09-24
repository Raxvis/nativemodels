const base = require('./base');
const parseValue = require('./../lib/parseValue');

const array = (type) => ({
	...base,
	parse(values, name) {
		return values.map((value) => parseValue(type, name, value));
	},
	validate(value, name) {
		if (Array.isArray(value)) {
			return true;
		}

		throw new Error(`Property ${name} is not an array`);
	},
});

module.exports = array;
