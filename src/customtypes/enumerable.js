const createType = require('./../createType');

const enumerable = (enumerableValues) =>
	createType({
		name: 'enumerable',
		validCheck: (key, value) => {
			if (enumerableValues.indexOf(value) > -1) {
				return true;
			}

			throw new Error(`Property ${key} is not in the list of enumerable values`);
		},
	});

module.exports = enumerable;
