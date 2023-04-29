const defaultOptions = require('./lib/defaultOptions');
const defaultRecord = require('./lib/defaultRecord');
const mapRecord = require('./lib/mapRecord');
const parseRecord = require('./lib/parseRecord');
const proxyHandler = require('./lib/proxyHandler');
const recaseKeys = require('./lib/recaseKeys');
const requireAllKeys = require('./lib/requireAllKeys');
const requiredCheck = require('./lib/requiredCheck');
const stripUndefinedKeys = require('./lib/stripUndefinedKeys');
const transformRecord = require('./lib/transformRecord');

const buildRecord = (schema, record, options) => {
  const mappedRecord = mapRecord(schema, record, options.caseSensitive);
  const transformedRecord = transformRecord(schema, mappedRecord);
  const stripedRecord = options.stripUndefined ? stripUndefinedKeys(schema, transformedRecord) : transformedRecord;
  const casedRecord = options.caseSensitive ? stripedRecord : recaseKeys(schema, stripedRecord);
  const defaultedRecord = defaultRecord(schema, casedRecord);

  return defaultedRecord;
};

const createModel =
  (schema, modelOptions = {}, context = {}) =>
  (record = {}) => {
    const options = { ...defaultOptions, ...modelOptions };
    const builtRecord = buildRecord(schema, record, options);
    const ctx = { ...context, record };

    if (options.strict) {
      requireAllKeys(schema, builtRecord);
    }

    requiredCheck(schema, builtRecord);

    const proxyTarget = parseRecord(schema, builtRecord, options);

    return new Proxy(proxyTarget, proxyHandler(schema, options, ctx));
  };

module.exports = createModel;
