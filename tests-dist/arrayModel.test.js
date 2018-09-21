/* global test, expect */

const { arrayModel, datatypes } = require('./../dist');

test('arrayModel - basic object model test', () => {
	const model = arrayModel({ name: datatypes.string() });

	expect(model([{ name: 'name' }])).toEqual([{ name: 'name' }]);
});

test('arrayModel - object model value check', () => {
	const model = arrayModel({ name: datatypes.string() });

	expect(model([{ name: 'name' }])[0].name).toEqual('name');
});

test('arrayModel - default check', () => {
	const model = arrayModel({ name: datatypes.string().default('name') });

	expect(model([{}])[0].name).toEqual('name');
});

test('arrayModel - required check', () => {
	const model = arrayModel({ name: datatypes.string().required() });

	expect(() => {
		model([{}]);
	}).toThrow();
});

test('arrayModel - computed type', () => {
	const model = arrayModel({
		firstName: datatypes.string(),
		fullName: datatypes.computed((record) => `${record.firstName} ${record.lastName}`),
		lastName: datatypes.string(),
	});

	const users = model([
		{
			firstName: 'John',
			lastName: 'Smith',
		},
	]);

	expect(users[0].fullName).toEqual('John Smith');

	users[0].firstName = 'James';

	expect(users[0].fullName).toEqual('James Smith');
});

test('arrayModel - fail to set value that does not exist', () => {
	const model = arrayModel({ name: datatypes.string() });

	expect(() => {
		model([{}])[0].lastName = 'test';
	}).toThrow();
});

test('arrayModel - handle empty records', () => {
	const model = arrayModel({ name: datatypes.string() });

	expect(model()).toEqual([]);
});
