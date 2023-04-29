const {
  createModel,
  datatypes: { computed, object, string },
} = require('./../../src');

test(`should get the original record passed in`, () => {
  const schema = {
    bar: string(),
    foo: computed((record, key, ctx) => ({ baz: ctx.record.bam }), object({ baz: string() })),
  };

  const model = createModel(schema);

  expect(model({ bam: 'bam', bar: 'bar' })).toEqual({
    bar: 'bar',
    foo: {
      baz: 'bam',
    },
  });
});
