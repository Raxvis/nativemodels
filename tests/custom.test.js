const {
	createModel,
	customtypes: { guid },
	datatypes: { array, boolean, float, int, object, string },
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

test(`undefined won't try and pass the validCheck`, () => {
	const model = createModel({ guid: guid() });

	expect(model({ guid: undefined })).toEqual({});
});

test(`undefined will fail the validCheck if stripUndefined is false`, () => {
	const model = createModel({ guid: guid() }, { stripUndefined: false });

	expect(() => {
		model({ guid: undefined });
	}).toThrow();
});

test(`accessing undefined parameter from model should result in undefined`, () => {
	const model = createModel({ guid: guid() });

	expect(model({ guid: undefined }).guid2).toEqual(undefined);
});

test(`shallow copy test`, () => {
	const model = createModel({ object: object({ foo: string().default('bar') }).default({}) });
	const data = model();

	expect(data).toEqual({ object: { foo: 'bar' } });

	const data2 = model(data);

	data2.object.foo = 'baz';
	expect(data).toEqual({ object: { foo: 'bar' } });
	expect(data2).toEqual({ object: { foo: 'baz' } });
});

test(`shallow copy test2`, () => {
	const model = createModel({ objects: array(object({ foo: string().default('bar') })).default([{}]) });
	const data = model();

	expect(data).toEqual({ objects: [{ foo: 'bar' }] });

	const data2 = model(data);

	data2.objects[0].foo = 'baz';
	expect(data).toEqual({ objects: [{ foo: 'bar' }] });
	expect(data2).toEqual({ objects: [{ foo: 'baz' }] });
});
