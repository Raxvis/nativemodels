/* global test, expect */

const {
	createModel,
	customtypes: { email },
} = require('./../source');

const validEmails = ['test@example.com'];
const invalidEmails = ['', 'test', '@example.com', 'example.com'];

test('customtype | email - invalid', () => {
	const model = createModel({ email: email() });

	invalidEmails.forEach((string) => {
		expect(() => {
			model({ email: string });
		}).toThrow();
	});
});
test('customtype | email - valid', () => {
	const model = createModel({ email: email() });

	validEmails.forEach((string) => {
		expect(model({ email: string })).toEqual({ email: string });
	});
});
