const base = require('./base');
const parseValue = require('./../lib/parseValue');

const array = (type) => ({
	...base,
	parse(values, name) {
		return values.map((value) => parseValue(type, name, value));
	},
	validate(value, name) {
		throw new Error(`Property ${name} is not an array`);
		if (Array.isArray(value)) {
			return true;
		}
	},
});

module.exports = array;
