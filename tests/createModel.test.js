const {
  createModel,
  datatypes: { int, string },
} = require('./../src');
const { userData, userResult, userSchema } = require('./setup');

test('createModel - basic object model test', () => {
  expect(createModel(userSchema)(userData)).toEqual(userResult);
});

test('createModel - object model value check', () => {
  expect(createModel(userSchema)(userData).firstName).toEqual(userResult.firstName);
});

test('createModel - default check', () => {
  expect(createModel(userSchema)(userData).typeID).toEqual(userResult.typeID);
});

test('createModel - required check', () => {
  const model = createModel(userSchema);

  expect(() => {
    model();
  }).toThrow();
});

test('createModel - computed type', () => {
  const model = createModel(userSchema);
  const user = model(userData);

  expect(user.fullName).toEqual(userResult.fullName);

  user.firstName = 'James';

  expect(user.fullName).toEqual('James Smith');
});

test('createModel - fail to set value that does not exist', () => {
  const model = createModel(userSchema);

  expect(() => {
    model(userData).unkownKey = 'test';
  }).toThrow();
});

test('createModel - fail to overwrite computed value', () => {
  const model = createModel(userSchema);
  const user = model(userData);

  user.fullName = 'test';

  expect(user.fullName).toEqual(userResult.fullName);
});

test('createModel - handle extra data', () => {
  const model = createModel(userSchema);

  expect(model({ ...userData, unkownKey: 'remove this' })).toEqual(userResult);
});

test('createModel - handle extra data part2', () => {
  const model = createModel(userSchema);

  const johnSmith = model(userData);
  const janeDoe = { ...johnSmith, firstName: 'Jane', lastName: 'Doe' };

  expect(janeDoe).toEqual({ ...userResult, firstName: 'Jane', lastName: 'Doe' });

  const parsedJaneDoe = model(janeDoe);

  expect(parsedJaneDoe).toEqual({ ...userResult, firstName: 'Jane', fullName: 'Jane Doe', lastName: 'Doe' });
});

test('createModel - allow nulls', () => {
  expect(createModel(userSchema)(userData).isAdmin).toEqual(null);
});

test('createModel - ensure set adheres to schema', () => {
  const user = createModel(userSchema)(userData);

  expect(() => {
    user.typeID = 'test';
  }).toThrow();
});

test('createModel - default overrides required', () => {
  const model = createModel({
    id: int().default(2).required(),
  });

  expect(model()).toEqual({ id: 2 });
});

test('createModel - array map', () => {
  const [user] = [userData].map(createModel(userSchema));

  expect(user).toEqual(userResult);
});

test('createModel - do not fail on no datatype or customtype', () => {
  const data = createModel({
    test: true,
  })({ test: false });

  expect(data).toEqual({ test: false });
});

test(`transform functionality`, () => {
  const model = createModel({ foo: string().transform((value) => value.toUpperCase()) });
  const data = model({ foo: 'bar' });

  expect(data).toEqual({ foo: 'BAR' });
});
