const isEqual = require('lodash.isequal');
const {
	createModel,
	datatypes: { string },
} = require('./../src');

const schema = {
	foo: string(),
};

test('strict - normal test', async () => {
	const model = createModel(schema);
	const data = { foo: 'bar' };

	await expect(isEqual(model(data), data)).toEqual(true);
});
