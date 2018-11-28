const createType = require('./../createType');

const guid = () =>
	createType({
		name: 'guid',
		parse: (key, value) => value.toUpperCase(),
		validCheck: (key, value) => {
			if (value === '00000000-0000-0000-0000-000000000000') {
				return true;
			} else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value)) {
				return true;
			}

			throw new Error(`Property ${key} is not a GUID`);
		},
	});

module.exports = guid;
