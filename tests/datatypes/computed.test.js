/* global test, expect */

const {
	createModel,
	datatypes: { array, computed, object, string },
	resolver,
} = require('./../source');

test('datatype | computed - basic test', () => {
	const schema = {
		firstName: string(),
		fullName: computed((record) => `${record.firstName} ${record.lastName}`),
		lastName: string(),
	};
	const model = createModel(schema);
	const user = model({
		firstName: 'John',
		lastName: 'Smith',
	});

	expect(user.fullName).toEqual('John Smith');
	user.firstName = 'James';
	expect(user.fullName).toEqual('James Smith');
});

test('datatype | computed - deep nested object', () => {
	const schema = {
		bar: object({
			bar: computed((record) => record.foo),
			foo: string(),
		}),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: {
			foo: 'baz',
		},
		foo: 'bar',
	});

	expect(data.bar.bar).toEqual('baz');
});

test('datatype | computed - deep nested array', () => {
	const schema = {
		bar: array(
			object({
				bar: computed((record) => record.foo),
				foo: string(),
			}),
		),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: [
			{
				foo: 'baz',
			},
			{
				foo: 'bat',
			},
		],
		foo: 'bar',
	});

	expect(data.bar[0].bar).toEqual('baz');
	expect(data.bar[1].bar).toEqual('bat');
});

test('datatype | computed - resolved deep nested object', async () => {
	const schema = {
		bar: object({
			bar: computed((record) => new Promise((success) => success(record.foo))),
			foo: string(),
		}),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: {
			foo: 'baz',
		},
		foo: 'bar',
	});
	const resolved = await resolver(data);

	expect(resolved.bar.bar).toEqual('baz');
});

test('datatype | computed - resolved deep nested array', async () => {
	const schema = {
		bar: array(
			object({
				bar: computed((record) => new Promise((success) => success(record.foo))),
				foo: string(),
			}),
		),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: [
			{
				foo: 'baz',
			},
			{
				foo: 'bat',
			},
		],
		foo: 'bar',
	});
	const resolved = await resolver(data);

	expect(resolved.bar[0].bar).toEqual('baz');
	expect(resolved.bar[1].bar).toEqual('bat');
});
