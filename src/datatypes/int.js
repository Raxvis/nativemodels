const base = require('./base');

const int = () => ({
	...base,
	parse(value, name) {
		if (
			value !== true &&
			value !== false &&
			value !== '' &&
			!isNaN(parseInt(value)) &&
			parseInt(value) === parseFloat(value)
		) {
			return parseInt(value);
		}

		throw new Error(`Property ${name} is not a int`);
	},
});

module.exports = int;
