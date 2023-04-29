const { createModel, createType, datatypes } = require('./../src');
const types = require('./setup/data/types');

test('test basic valid / invalid datatypes', () => {
  Object.keys(types).forEach((type) => {
    if (types[type].valid) {
      types[type].valid.forEach((value) => {
        const model = createModel({ [type]: datatypes[type]() });
        const record = model({ [type]: value });
        const { parse } = datatypes[type]();

        expect(record[type]).toEqual(parse('', value));
      });
    }

    if (types[type].invalid) {
      types[type].invalid.forEach((value) => {
        const model = createModel({ [type]: datatypes[type]() });

        expect(() => {
          model({ [type]: value });
          console.log(`invalid: ${type}: ${value}`);
        }).toThrow();
      });
    }
  });
});

test('test strict', () => {
  Object.keys(types).forEach((type) => {
    if (types[type].strict) {
      types[type].strict.forEach((value) => {
        const model = createModel({ [type]: datatypes[type]().strict() });
        const record = model({ [type]: value });
        const { parse } = datatypes[type]();

        expect(record[type]).toEqual(parse('', value));
      });
    }
  });
});

test('test invalid strict', () => {
  Object.keys(types).forEach((type) => {
    if (types[type].invalidStrict) {
      types[type].invalidStrict.forEach((value) => {
        const model = createModel({ [type]: datatypes[type]().strict() });

        expect(() => {
          model({ [type]: value });
        }).toThrow();
      });
    }
  });
});

test('ensure required works on all data types', () => {
  Object.keys(types).forEach((type) => {
    const model = createModel({ [type]: datatypes[type]().required() });

    expect(() => {
      model();
    }).toThrow();
  });
});

test('ensure default works on all data types', () => {
  Object.keys(types).forEach((type) => {
    if (types[type].valid) {
      types[type].valid.forEach((value) => {
        const model = createModel({ [type]: datatypes[type]().default(value) });
        const record = model();
        const { parse } = datatypes[type]();

        expect(record[type]).toEqual(parse('', value));
      });
    }
  });
});

test('ensure nullable works on all data types', () => {
  Object.keys(types).forEach((type) => {
    if (types[type].valid) {
      types[type].valid.forEach(() => {
        const model = createModel({ [type]: datatypes[type]().nullable() });
        const record = model({ [type]: null });

        expect(record[type]).toEqual(null);
      });
    }
  });
});

test('extending with bad validCheck throws error', () => {
  const customType = () =>
    createType({
      validCheck() {
        return false;
      },
    });

  const model = createModel({ foo: customType() });

  expect(() => {
    model({ foo: 'bar' });
  }).toThrow();
});
