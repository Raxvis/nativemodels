const defaultOptions = require('./lib/defaultOptions');
const defaultRecord = require('./lib/defaultRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const recaseKeys = require('./lib/recaseKeys');
const requireAllKeys = require('./lib/requireAllKeys');
const requiredCheck = require('./lib/requiredCheck');

const createModel = (schema, modelOptions = {}) => (record = {}) => {
	const options = { ...defaultOptions, ...modelOptions };
	const casedRecord = options.caseSensitive ? record : recaseKeys(schema, record);
	const defaultedRecord = defaultRecord(schema, casedRecord);

	if (options.strict) {
		requireAllKeys(schema, defaultedRecord);
	}

	requiredCheck(schema, defaultedRecord);

	const proxyTarget = parseRecord(schema, defaultedRecord);

	return new Proxy(proxyTarget, proxyHandler(schema, options));
};

module.exports = createModel;
