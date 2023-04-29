const {
  createModel,
  customtypes: { guid },
} = require('./../../src');

const validGUID = '2FC923FF-A906-11D3-8967-00105A7027AA';
const blankGUID = '00000000-0000-0000-0000-000000000000';

test('customtype | guid - invalid', () => {
  const model = createModel({ guid: guid() });

  expect(() => {
    model({ guid: '' });
  }).toThrow();
  expect(() => {
    model({ guid: 'string' });
  }).toThrow();
});

test('customtype | guid - valid', () => {
  const model = createModel({ guid: guid() });

  expect(model({ guid: validGUID })).toEqual({ guid: validGUID });
  expect(model({ guid: blankGUID })).toEqual({ guid: blankGUID });
});

test(`undefined won't try and pass the validCheck`, () => {
  const model = createModel({ guid: guid() });

  expect(model({ guid: undefined })).toEqual({});
});

test(`undefined will fail the validCheck if stripUndefined is false`, () => {
  const model = createModel({ guid: guid() }, { stripUndefined: false });

  expect(() => {
    model({ guid: undefined });
  }).toThrow();
});

test(`accessing undefined parameter from model should result in undefined`, () => {
  const model = createModel({ guid: guid() });

  expect(model({ guid: undefined }).guid2).toEqual(undefined);
});
