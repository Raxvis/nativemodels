const base = require('./base');

const isValidDate = (value, name, strict = false) => {
	if (value instanceof Date) {
		return true;
	}

	if (!strict) {
		const test = new Date(value);

		if (value && test instanceof Date && !isNaN(test)) {
			return true;
		}
	}

	throw new Error(`Property ${name} is not a date`);
};

const date = () => ({
	...base,
	parse: (value) => (value instanceof Date ? value : new Date(value)),
	strictCheck: (value, name) => isValidDate(value, name, true),
	validate: (value, name) => isValidDate(value, name),
});

module.exports = date;
