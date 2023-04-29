const {
  createModel,
  datatypes: { string },
} = require('./../src');

test('stripNulls - default test', async () => {
  const model = createModel({ foo: string() });

  await expect(() => {
    model({ foo: null });
  }).toThrow();
});

test('stripNulls - normal test', async () => {
  const model = createModel({ foo: string() }, { stripNulls: true });
  const result = model({ foo: null });

  await expect(result).toEqual({});
});
