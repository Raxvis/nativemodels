const defaultRecord = require('./lib/defaultRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const requiredCheck = require('./lib/requiredCheck');

const objectModel = (schema) => (record = {}) => {
	requiredCheck(schema, record);

	const proxyTarget = parseRecord(schema, record, defaultRecord(schema, record));

	return new Proxy(proxyTarget, proxyHandler(schema));
};

module.exports = objectModel;
