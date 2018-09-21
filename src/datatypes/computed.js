const base = require('./base');

const computed = (fn) => ({
	...base,
	fn,
});

module.exports = computed;
