const createType = require('./../createType');
const { isRegex } = require('./../lib/checks/types');

const regex = (expression, typeName) =>
	createType({
		name: typeName,
		validCheck: (key, value) => {
			if (isRegex(expression) && expression.test(value)) {
				return true;
			}

			if (!isRegex(expression)) {
				throw new Error(`Regex expression provided isn't a valid regex`);
			}

			throw new Error(`Property ${key} (${value}) is not a/an ${typeName}`);
		},
	});

module.exports = regex;
