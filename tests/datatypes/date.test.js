const {
	datatypes: { date },
	createModel,
	resolve,
} = require('./../../src');

test('datatype | date - basic date test', () => {
	expect(createModel({ date: date() })({ date: '2018-10-01 00:00:00' })).toEqual({
		date: new Date('2018-10-01 00:00:00'),
	});
});

test('datatype | date - resolve and date work', async () => {
	const data = createModel({ date: date() })({ date: '2018-10-01 00:00:00' });
	const resolved = await resolve(data);

	expect(resolved).toEqual(data);
});
