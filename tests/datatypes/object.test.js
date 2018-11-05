const { createModel } = require('./../source');
const { userData, userResult, userSchema } = require('./../setup');

test('datatype | object - basic object test', () => {
	expect(createModel(userSchema)(userData)).toEqual(userResult);
});
