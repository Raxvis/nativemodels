const {
  datatypes: { object },
  createModel,
} = require('./../../src');
const { userData, userResult, userSchema } = require('./../setup');

test('datatype | object - basic object test', () => {
  expect(createModel(userSchema)(userData)).toEqual(userResult);
});

test('datatype | object - no schema allows for any object', () => {
  expect(createModel({ object: object() })({ object: {} })).toEqual({ object: {} });
  expect(createModel({ object: object() })({ object: { foo: 'bar' } })).toEqual({ object: { foo: 'bar' } });
  expect(() => {
    createModel({ object: object().required() })({});
  }).toThrow();
  expect(createModel({ object: object().default({ foo: 'bar' }) })({})).toEqual({ object: { foo: 'bar' } });
});
