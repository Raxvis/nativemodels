const base = require('./base');

const boolean = () => ({
	...base,
	parse(value) {
		return Boolean(value);
	},
});

module.exports = boolean;
