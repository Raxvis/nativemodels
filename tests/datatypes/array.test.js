/* global test, expect */

const {
	createModel,
	datatypes: { array, base },
} = require('./../source');
const { userData, userResult, userSchema } = require('./../setup');

test('datatype | array - basic array test', () => {
	const photos = [
		{
			ext: '.jpg',
			url: 'https://example.com/img.jpg',
		},
	];
	const data = {
		...userData,
		photos,
	};
	const result = {
		...userResult,
		photos,
	};

	expect(createModel(userSchema)(data)).toEqual(result);
});

test('datatype | array - extending with bad validate throws error', () => {
	const customType = () => ({
		...base,
		validate() {
			return false;
		},
	});

	const model = createModel({ foo: array(customType()) });

	expect(() => {
		model({ foo: 'bar' });
	}).toThrow();
	expect(() => {
		model({ foo: ['bar'] });
	}).toThrow();
});
