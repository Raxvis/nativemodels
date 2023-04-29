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
  }).toThrow('NativeModels - Property name is longer than 3');
});

test('datatype | string - null should not go to string', () => {
  expect(() => {
    createModel({ name: string() })({ name: null });
  }).toThrow('NativeModels - Property name is not a string');
  expect(createModel({ name: string().nullable() })({ name: null })).toEqual({ name: null });
});
