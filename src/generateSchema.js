const customtypes = require('./customtypes');
const datatypes = require('./datatypes');
const generateType = require('./lib/type/generate');

module.exports = (schema, usertypes = {}, fns = {}) => {
	const obj = typeof schema === 'string' ? JSON.parse(schema) : schema;
	const types = { ...datatypes, ...customtypes, ...usertypes };

	return Object.keys(obj).reduce((result, key) => ({ ...result, [key]: generateType(obj[key], types, fns) }), {});
};
