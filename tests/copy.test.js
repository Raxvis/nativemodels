const {
	createModel,
	datatypes: { array, object, string },
} = require('./../src');

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
