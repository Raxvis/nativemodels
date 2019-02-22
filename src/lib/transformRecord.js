const transformValue = require('./transformValue');

const transformRecord = (schema, record) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			[key]: schema[key] ? transformValue(schema[key], record[key], 'pre') : record[key],
		}),
		{},
	);

module.exports = transformRecord;
