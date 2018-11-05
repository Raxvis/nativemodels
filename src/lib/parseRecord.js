const parseValue = require('./parseValue');

const parseRecord = (schema, record) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			...(schema[key] ? { [key]: parseValue(schema[key], key, record[key]) } : {}),
		}),
		{},
	);

module.exports = parseRecord;
