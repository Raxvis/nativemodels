const stripUndefinedKeys = (schema, record) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			...(typeof record[key] === 'undefined' ? {} : { [key]: record[key] }),
		}),
		{},
	);

module.exports = stripUndefinedKeys;
