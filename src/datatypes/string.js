const createType = require('./../createType');

const string = () =>
	createType({
		name: 'string',
		parse: (key, value) => `${value}`,
		strictCheck: (key, value) => {
			if (typeof value === 'string') {
				return true;
			}

			throw new Error(`Property ${key} is not a string`);
		},
	});

module.exports = string;
