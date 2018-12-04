const base = require('./datatypes/base');

const createType = (overrides, extended = base()) => ({
	...extended,
	...overrides,
});

module.exports = createType;
