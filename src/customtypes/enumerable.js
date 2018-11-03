const base = require('./../datatypes/base');

const enumerable = (enumerableValues) => ({
	...base,
	validate: (value, name) => {
		if (enumerableValues.indexOf(value) > -1) {
			return true;
		}

		throw new Error(`Property ${name} is not in the list of enumerable values`);
	},
});

module.exports = enumerable;
