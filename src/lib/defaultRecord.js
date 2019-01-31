// Filter first

const defaultRecord = (schema, record) => ({
	...Object.keys(schema).reduce(
		(result, key) => ({
			...result,
			...(schema[key].hasDefault ? { [key]: schema[key].defaultValue } : {}),
		}),
		{},
	),
	...record,
});

module.exports = defaultRecord;
