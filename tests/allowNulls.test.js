const {
	createModel,
	datatypes: { string },
} = require('./../src');

test('allowNulls - normal test', async () => {
	const model = createModel({ foo: string() }, { allowNulls: true });
	const result = model({ foo: null });

	await expect(result).toEqual({ foo: null });
});
