const createType = require('./../createType');
const createModel = require('./../createModel');
const { isObject } = require('./../lib/checks/types');

const object = (schema, options) =>
	createType({
		name: 'object',
		parse: (key, value) => (schema ? createModel(schema, options)(value) : value),
		validCheck: (key, value) => {
			if (isObject(value)) {
				return true;
			}

			throw new Error(`Property ${key} is not an object`);
		},
	});

module.exports = object;
