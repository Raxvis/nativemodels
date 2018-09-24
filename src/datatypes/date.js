const base = require('./base');

const date = () => ({
	...base,
	validate(value, name) {
		if (value instanceof Date) {
			return true;
		}

		throw new Error(`Property ${name} is not a date`);
	},
});

module.exports = date;
