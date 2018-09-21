const base = require('./base');

const date = () => ({
	...base,
	parse(value, name) {
		if (value instanceof Date) {
			return value;
		}

		throw new Error(`Property ${name} is not a date`);
	},
});

module.exports = date;
