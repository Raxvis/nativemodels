const {
	createModel,
	customtypes: { email },
	datatypes: { string },
} = require('./../src');

test('transform - pre', async () => {
	const schema = {
		foo: email().transform((value) => (value === '' ? undefined : value), 'pre'),
	};
	const model = createModel(schema);

	await expect(model({ foo: '' })).toEqual({});
});

test('transform - post', async () => {
	const schema = {
		foo: string().transform((value) => (value === '' ? 'bar' : value), 'post'),
	};
	const model = createModel(schema);

	await expect(model({ foo: '' })).toEqual({ foo: 'bar' });
});
