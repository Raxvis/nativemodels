const defaultOptions = require('./lib/defaultOptions');
const defaultRecord = require('./lib/defaultRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const recaseKeys = require('./lib/recaseKeys');
const requireAllKeys = require('./lib/requireAllKeys');
const requiredCheck = require('./lib/requiredCheck');
const stripUndefinedKeys = require('./lib/stripUndefinedKeys');

const createModel = (schema, modelOptions = {}, context = {}) => (record = {}) => {
	const options = { ...defaultOptions, ...modelOptions };
	const stripedRecord = options.stripUndefined ? stripUndefinedKeys(schema, record) : record;
	const casedRecord = options.caseSensitive ? stripedRecord : recaseKeys(schema, stripedRecord);
	const defaultedRecord = defaultRecord(schema, casedRecord);

	if (options.strict) {
		requireAllKeys(schema, defaultedRecord);
	}

	requiredCheck(schema, defaultedRecord);

	const proxyTarget = parseRecord(schema, defaultedRecord);

	return new Proxy(proxyTarget, proxyHandler(schema, options, context));
};

module.exports = createModel;
