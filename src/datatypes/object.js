const base = require('./base');
const createModel = require('./../createModel');

const object = (schema, options) => ({
	...base,
	parse: (value) => createModel(schema, options)(value),
	validate: (value, name) => {
		if (typeof value === 'object' && !Array.isArray(value)) {
			return true;
		}

		throw new Error(`Property ${name} is not an object`);
	},
});

module.exports = object;
