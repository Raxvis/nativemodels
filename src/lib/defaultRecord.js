const defaultRecord = (schema, record) => ({
	...Object.keys(schema)
		.filter((key) => schema[key].hasDefault)
		.reduce(
			(result, key) => ({
				...result,
				...{ [key]: schema[key].defaultValue },
			}),
			{},
		),
	...record,
});

module.exports = defaultRecord;
