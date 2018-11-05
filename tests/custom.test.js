const {
	createModel,
	datatypes: { boolean },
} = require('./source');

test('boolean required check with "false"', () => {
	const schema = { boolean: boolean().required() };
	const model = createModel(schema);
	const data = model({ boolean: false });

	expect(data.boolean).toEqual(false);
});
