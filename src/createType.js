const base = require('./datatypes/base');

const createType = (overrides) => ({
	...base,
	...overrides,
});

module.exports = createType;
