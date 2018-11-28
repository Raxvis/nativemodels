const createType = require('./../createType');

const regex = (expression, typeName) =>
	createType({
		name: typeName,
		validCheck: (key, value) => {
			if (expression.test(value)) {
				return true;
			}

			throw new Error(`Property ${key} (${value}) is not a/an ${typeName}`);
		},
	});

module.exports = regex;
