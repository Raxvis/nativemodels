const recaseRecord = (record) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			[key.toLowerCase()]: record[key],
		}),
		{},
	);

const getFromKeyValue = (schema, record, { caseSensitive, key }) => {
	const {
		fromOptions: { caseSensitive: fromOptionsCaseSensitive },
	} = schema[key];
	const lowerCase = typeof fromOptionsCaseSensitive === 'undefined' ? !caseSensitive : !fromOptionsCaseSensitive;
	const fromKeys = [key, ...schema[key].fromKeys].map((key) => (lowerCase ? key.toLowerCase() : key));
	const recasedRecord = lowerCase ? recaseRecord(record) : record;
	const value = fromKeys.find((fromKey) => typeof recasedRecord[fromKey] !== 'undefined');

	return recasedRecord[value];
};

const mapRecord = (schema, record, caseSensitive) => ({
	...record,
	...Object.keys(schema)
		.filter((key) => schema[key].fromKeys)
		.reduce(
			(result, key) => ({
				...result,
				...{ [key]: getFromKeyValue(schema, record, { caseSensitive, key }) },
			}),
			{},
		),
});

module.exports = mapRecord;
