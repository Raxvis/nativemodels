const createType = require('./../createType');
const parseValue = require('./../lib/parseValue');

const array = (type) =>
	createType({
		name: 'array',
		parse: (key, values) => values.map((value) => parseValue(type, key, value)),
		validCheck: (key, value) => {
			if (Array.isArray(value)) {
				return true;
			}

			throw new Error(`Property ${key} is not an array`);
		},
	});

module.exports = array;
