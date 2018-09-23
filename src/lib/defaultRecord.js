const defaultRecord = (schema, record) =>
	Object.keys(schema).reduce(
		(result, key) => ({
			...result,
			...(schema[key].hasDefault && !record[key] ? { [key]: schema[key].defaultValue } : {}),
		}),
		{},
	);

module.exports = defaultRecord;
