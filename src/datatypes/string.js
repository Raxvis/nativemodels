const createType = require('./../createType');

const string = (options = {}) =>
	createType({
		name: 'string',
		parse: (key, value) => {
			if (options.length) {
				return `${value}`.slice(0, options.length);
			}

			return `${value}`;
		},
		strictCheck: (key, value) => {
			if (typeof value === 'string') {
				if (options.length && value.length > options.length) {
					throw new Error(`Property ${key} is longer than ${options.length}`);
				}
				return true;
			}

			throw new Error(`Property ${key} is not a string`);
		},
	});

module.exports = string;
