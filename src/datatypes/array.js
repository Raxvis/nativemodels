const createType = require('./../createType');
const parseValue = require('./../lib/parseValue');
const { isArray } = require('./../lib/checks/types');

const array = (type) =>
	createType({
		name: 'array',
		parse: (key, values, parentOptions) => values.map((value) => parseValue(type, key, value, parentOptions)),
		validCheck: (key, value) => {
			if (isArray(value)) {
				return true;
			}

			throw new Error(`NativeModels - Property ${key} is not an array`);
		},
	});

module.exports = array;
