const {
	createModel,
	customtypes: { enumerable },
} = require('./../source');

test('customtype | guid - invalid', () => {
	const model = createModel({ enumerable: enumerable(['FOO', 'BAR']) });

	expect(() => {
		model({ enumerable: '' });
	}).toThrow();
	expect(() => {
		model({ enumerable: 1 });
	}).toThrow();
	expect(() => {
		model({ enumerable: 'BAZ' });
	}).toThrow();
});

test('customtype | enumerable - valid', () => {
	const model = createModel({ enumerable: enumerable(['FOO', 'BAR']) });

	expect(model({ enumerable: 'FOO' })).toEqual({ enumerable: 'FOO' });
	expect(model({ enumerable: 'BAR' })).toEqual({ enumerable: 'BAR' });
});

test('customtype | enumerable - allow null', () => {
	const model = createModel({ enumerable: enumerable(['FOO', 'BAR']).nullable() });

	expect(model({ enumerable: null })).toEqual({ enumerable: null });
});

test('customtype | enumerable - make sure required works', () => {
	const model = createModel({ enumerable: enumerable(['FOO', 'BAR']).required() });

	expect(() => {
		model();
	}).toThrow();
});
