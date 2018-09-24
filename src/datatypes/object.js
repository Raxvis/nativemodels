const base = require('./base');
const createModel = require('./../createModel');

const object = (schema) => ({
	...base,
	parse(value) {
		return createModel(schema)(value);
	},
	validate(value, name) {
		if (typeof value === 'object' && !Array.isArray(value)) {
			return true;
		}

		throw new Error(`Property ${name} is not an object`);
	},
});

module.exports = object;
