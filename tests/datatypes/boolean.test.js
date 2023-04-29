const {
  createModel,
  datatypes: { boolean },
} = require('./../../src');

test('boolean required check with "false"', () => {
  const model = createModel({ boolean: boolean().required() });

  expect(model({ boolean: false }).boolean).toEqual(false);
});
