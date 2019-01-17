const {
	createModel,
	datatypes: { float },
} = require('./../../src');

test('float required check with "0"', () => {
	const model = createModel({ float: float().required() });

	expect(model({ float: 0 }).float).toEqual(0);
	expect(model({ float: 0.0 }).float).toEqual(0.0);
});
