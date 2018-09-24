const base = require('./base');

const string = () => ({
	...base,
	parse(value) {
		return `${value}`;
	},
});

module.exports = string;
