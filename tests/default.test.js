const {
  createModel,
  datatypes: { boolean, string },
} = require('./../src');

test('default - value', async () => {
  const schema = { foo: string().default('test') };
  const model = createModel(schema);

  await expect(model({})).toEqual({ foo: 'test' });
});

test('default - function', async () => {
  const x = 2;
  const schema = { foo: string().default(() => x * 2) };
  const model = createModel(schema);

  await expect(model({})).toEqual({ foo: '4' });
});

test('default - boolean', async () => {
  const schema = { foo: boolean().default(true) };
  const model = createModel(schema);

  await expect(model({})).toEqual({ foo: true });
  await expect(model({ foo: false })).toEqual({ foo: false });
});
