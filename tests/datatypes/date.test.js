const {
	datatypes: { date },
	createModel,
	resolver,
} = require('./../source');

test('datatype | date - basic date test', () => {
	expect(createModel({ date: date() })({ date: '2018-10-01 00:00:00' })).toEqual({
		date: new Date('2018-10-01 00:00:00'),
	});
});

test('datatype | date - resolver and date work', async () => {
	const data = createModel({ date: date() })({ date: '2018-10-01 00:00:00' });
	const resolved = await resolver(data);

	expect(resolved).toEqual(data);
});
