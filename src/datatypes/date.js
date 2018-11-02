const base = require('./base');

const date = () => ({
	...base,
	parse(value) {
		if (value instanceof Date) {
			return value;
		}

		return new Date(value);
	},
	strictCheck(value, name) {
		if (value instanceof Date) {
			return true;
		}

		throw new Error(`Property ${name} is not a date`);
	},
	validate(value, name) {
		if (value instanceof Date) {
			return true;
		}

		try {
			const test = new Date(value);

			if (value && test instanceof Date && !isNaN(test)) {
				return true;
			}
		} catch (error) {
			// Do nothing, it's not a date
		}

		throw new Error(`Property ${name} is not a date`);
	},
});

module.exports = date;
