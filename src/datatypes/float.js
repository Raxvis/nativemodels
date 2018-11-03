const base = require('./base');

const float = () => ({
	...base,
	parse: (value) => parseFloat(value),
	strictCheck: (value, name) => {
		if (typeof value === 'number') {
			return true;
		}

		throw new Error(`Property ${name} is not a float`);
	},
	validate: (value, name) => {
		if (!isNaN(parseFloat(value)) && value !== true && value !== false && value !== '') {
			return true;
		}

		throw new Error(`Property ${name} is not a float`);
	},
});

module.exports = float;
