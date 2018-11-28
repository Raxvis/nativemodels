const createType = require('./../createType');

const isValidDate = (key, value, strict = false) => {
	if (value instanceof Date) {
		return true;
	}

	if (!strict) {
		const test = new Date(value);

		if (value && test instanceof Date && !isNaN(test)) {
			return true;
		}
	}

	throw new Error(`Property ${key} is not a date`);
};

const date = () =>
	createType({
		name: 'date',
		parse: (key, value) => (value instanceof Date ? value : new Date(value)),
		strictCheck: (key, value) => isValidDate(key, value, true),
		validCheck: (key, value) => isValidDate(key, value),
	});

module.exports = date;
