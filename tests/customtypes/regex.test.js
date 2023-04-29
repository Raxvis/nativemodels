const {
  createModel,
  customtypes: { regex },
} = require('./../../src');

test('customtype | regex - invalid regex', () => {
  const model = createModel({ regex: regex('asdfasd') });

  expect(() => {
    model({ regex: 'foo' });
  }).toThrow();
});
