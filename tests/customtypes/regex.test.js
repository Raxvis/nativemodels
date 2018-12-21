const {
	createModel,
	customtypes: { regex },
} = require('./../source');

test('customtype | regex - invalid regex', () => {
	const model = createModel({ regex: regex('asdfasd') });

	expect(() => {
		model({ regex: 'foo' });
	}).toThrow();
});
