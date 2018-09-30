/* global test, expect */

const {
	createModel,
	customtypes: { phone },
} = require('./../source');

const validPhoneNumbers = ['123-456-7890', '(123) 456-7890', '123 456 7890', '123.456.7890', '+91 (123) 456-7890'];
const invalidPhoneNumbers = ['', 'a', '123412345456', 1234567890];

test('customtype | phone - invalid', () => {
	const model = createModel({ phone: phone() });

	invalidPhoneNumbers.forEach((string) => {
		expect(() => {
			model({ phone: string });
		}).toThrow();
	});
});
test('customtype | phone - valid', () => {
	const model = createModel({ phone: phone() });

	validPhoneNumbers.forEach((string) => {
		expect(model({ phone: string })).toEqual({ phone: string });
	});
});
