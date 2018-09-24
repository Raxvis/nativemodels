const base = require('./../datatypes/base');

const int = () => ({
	...base,
	parse(value) {
		return value.toUpperCase();
	},
	validate(value, name) {
		if (value === '00000000-0000-0000-0000-000000000000') {
			return true;
		} else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(value)) {
			return true;
		}

		throw new Error(`Property ${name} is not a GUID`);
	},
});

module.exports = int;
