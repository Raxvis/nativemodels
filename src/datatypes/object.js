const base = require('./base');
const createModel = require('./../createModel');

const object = (schema, options) => ({
	...base,
	parse: (key, value) => createModel(schema, options)(value),
	validCheck: (key, value) => {
		if (typeof value === 'object' && !Array.isArray(value)) {
			return true;
		}

		throw new Error(`Property ${key} is not an object`);
	},
});

module.exports = object;
