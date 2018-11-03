const base = require('./base');

const boolean = () => ({
	...base,
	parse: (value) => Boolean(value),
	strictCheck: (value, name) => {
		if (typeof value === 'boolean') {
			return true;
		}

		throw new Error(`Property ${name} is not a boolean`);
	},
});

module.exports = boolean;
