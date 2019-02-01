const {
	createModel,
	datatypes: { int },
} = require('./../src');

test('largeSchema order test', async () => {
	const limit = 100;
	const largeSchema = [...Array(limit).keys()].reduce(
		(result, key) => ({
			...result,
			[`number_${key}`]:
				key % 2 === 0
					? int()
							.default(key)
							.nullable()
							.from('temp')
					: int(),
		}),
		{},
	);
	const largeData = [...Array(limit).keys()].reduce((result, key) => ({ ...result, [`number_${key}`]: key }), {});
	const model = createModel(largeSchema);
	const keySet = [...Array(limit).keys()].map((key) => `number_${key}`);

	await expect(model(largeData)).toEqual(largeData);
	await expect(Object.keys(model(largeData))).toEqual(keySet);
});
