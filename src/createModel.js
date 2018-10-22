const defaultRecord = require('./lib/defaultRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const recaseKeys = require('./lib/recaseKeys');
const requiredCheck = require('./lib/requiredCheck');
const strictCheck = require('./lib/strictCheck');
const defaultOptions = require('./lib/defaultOptions');

const createModel = (schema, modelOptions = {}) => (record = {}) => {
	const options = { ...defaultOptions, ...modelOptions };
	const casedRecord = options.caseSensitive ? record : recaseKeys(schema, record);

	if (options.strict) {
		strictCheck(schema, casedRecord);
	}
	requiredCheck(schema, casedRecord);

	const proxyTarget = parseRecord(schema, casedRecord, defaultRecord(schema, casedRecord));

	return new Proxy(proxyTarget, proxyHandler(schema, options));
};

module.exports = createModel;
