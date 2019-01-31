const {
	createModel,
	datatypes: { array, object, string },
} = require('./../src');

// const schema = {
// 	bar: string().from('baz', { caseSensitive: false }),
// 	baz: object({
// 		foo2: string().from('fooTwo')
// 	}),
// 	bazz: object({
// 		foo: string(),
// 	}).from('bazzObj')
// 	foo: string().from('Foo'),
// 	foos: array(string())
// };

test('from', () => {
	const model = createModel({ foo: string().from('bar') });

	expect(model({ bar: 'bar' })).toEqual({ foo: 'bar' });
});

test('from array', () => {
	const model = createModel({ foo: string().from(['bar', 'baz']) });

	expect(model({ bar: 'bar' })).toEqual({ foo: 'bar' });
	expect(model({ baz: 'bar' })).toEqual({ foo: 'bar' });
});

test('from caseSensitive option', () => {
	const model = createModel({ foo: string().from('Bar', { caseSensitive: false }) });

	expect(model({ bar: 'bar' })).toEqual({ foo: 'bar' });
});

test('from caseSensitive option on createModel', () => {
	const model = createModel({ foo: string().from('Bar') }, { caseSensitive: false });

	expect(model({ bar: 'bar' })).toEqual({ foo: 'bar' });
});

test('from in object', () => {
	const model = createModel({
		foo: object({
			bar: string().from('baz'),
		}),
	});

	expect(model({ foo: { baz: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from in object with options', () => {
	const model = createModel({
		foo: object({
			bar: string().from('Baz', { caseSensitive: false }),
		}),
	});

	expect(model({ foo: { baz: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from in object with options on createModel', () => {
	const model = createModel({
		foo: object(
			{
				bar: string().from('Baz'),
			},
			{ caseSensitive: false },
		),
	});

	expect(model({ foo: { baz: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from on object', () => {
	const model = createModel({
		foo: object({
			bar: string(),
		}).from('baz'),
	});

	expect(model({ baz: { bar: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from on object with options', () => {
	const model = createModel({
		foo: object({
			bar: string(),
		}).from('Baz', { caseSensitive: false }),
	});

	expect(model({ baz: { bar: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from on object with options on createModel', () => {
	const model = createModel(
		{
			foo: object({
				bar: string(),
			}).from('Baz'),
		},
		{ caseSensitive: false },
	);

	expect(model({ baz: { bar: 'bar' } })).toEqual({ foo: { bar: 'bar' } });
});

test('from on array', () => {
	const model = createModel({ foo: array(string()).from('baz') });

	expect(model({ baz: ['bar'] })).toEqual({ foo: ['bar'] });
});

test('from on array with options', () => {
	const model = createModel({
		foo: array(string()).from('Baz', { caseSensitive: false }),
	});

	expect(model({ baz: ['bar'] })).toEqual({ foo: ['bar'] });
});

test('from on array with options on createModel', () => {
	const model = createModel({ foo: array(string()).from('Baz') }, { caseSensitive: false });

	expect(model({ baz: ['bar'] })).toEqual({ foo: ['bar'] });
});
