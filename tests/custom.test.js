const {
	createModel,
	datatypes: { boolean, float, int },
} = require('./source');

test('boolean required check with "false"', () => {
	const model = createModel({ boolean: boolean().required() });

	expect(model({ boolean: false }).boolean).toEqual(false);
});

test('int required check with "0"', () => {
	const model = createModel({ int: int().required() });

	expect(model({ int: 0 }).int).toEqual(0);
});

test('float required check with "0"', () => {
	const model = createModel({ float: float().required() });

	expect(model({ float: 0 }).float).toEqual(0);
	expect(model({ float: 0.0 }).float).toEqual(0.0);
});
