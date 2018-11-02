const base = require('./base');

const string = () => ({
	...base,
	parse(value) {
		return `${value}`;
	},
	strictCheck(value, name) {
		if (typeof value === 'string') {
			return true;
		}

		throw new Error(`Property ${name} is not a string`);
	},
});

module.exports = string;
