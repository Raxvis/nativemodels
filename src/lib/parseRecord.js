const parseValue = require('./parseValue');

const parseRecord = (schema, record, defaultedRecord) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			...(schema[key] ? { [key]: parseValue(schema, key, record[key]) } : {}),
		}),
		defaultedRecord,
	);

module.exports = parseRecord;
