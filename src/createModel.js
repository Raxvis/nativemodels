const defaultRecord = require('./lib/defaultRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const recaseKeys = require('./lib/recaseKeys');
const requiredCheck = require('./lib/requiredCheck');

const objectModel = (schema, options = { caseSensitive: true }) => (record = {}) => {
	const casedRecord = options.caseSensitive ? record : recaseKeys(schema, record);

	requiredCheck(schema, casedRecord);

	const proxyTarget = parseRecord(schema, casedRecord, defaultRecord(schema, casedRecord));

	return new Proxy(proxyTarget, proxyHandler(schema, options));
};

module.exports = objectModel;
