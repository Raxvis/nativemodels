const {
	createModel,
	datatypes: { int },
} = require('./../../src');

test('int required check with "0"', () => {
	const model = createModel({ int: int().required() });

	expect(model({ int: 0 }).int).toEqual(0);
});
