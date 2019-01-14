const {
	createModel,
	datatypes: { string },
} = require('./../../src');

test('datatype | string - basic string test', () => {
	expect(createModel({ name: string() })({ name: 'John' })).toEqual({ name: 'John' });
});

test('datatype | string - basic string length option', () => {
	expect(createModel({ name: string({ length: 3 }) })({ name: 'John' })).toEqual({ name: 'Joh' });
});

test('datatype | string - basic string length option strict', () => {
	expect(() => {
		createModel({ name: string({ length: 3 }).strict() })({ name: 'John' });
	}).toThrow('Property name is longer than 3');
});
