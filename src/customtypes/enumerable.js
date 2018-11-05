const base = require('./../datatypes/base');

const enumerable = (enumerableValues) => ({
	...base,
	validate: (key, value) => {
		if (enumerableValues.indexOf(value) > -1) {
			return true;
		}

		throw new Error(`Property ${key} is not in the list of enumerable values`);
	},
});

module.exports = enumerable;
