const defaultRecord = (schema, record) => ({
	...record,
	...Object.keys(schema).reduce(
		(result, key) => ({
			...result,
			...(schema[key].hasDefault ? { [key]: record[key] || schema[key].defaultValue } : {}),
		}),
		{},
	),
});

module.exports = defaultRecord;
