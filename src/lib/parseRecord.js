const parseValue = require('./parseValue');

const parseRecord = (schema, record, allowNulls) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			...(schema[key] ? { [key]: parseValue(schema[key], key, record[key], allowNulls) } : {}),
		}),
		{},
	);

module.exports = parseRecord;
