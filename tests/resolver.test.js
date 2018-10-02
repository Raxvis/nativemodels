/* global test, expect */

const {
	createModel,
	datatypes: { array, boolean, computed, int, object },
	resolver,
} = require('./source');

const schema = {
	async: computed(
		(record) =>
			new Promise((succeed, reject) => (record.succeed ? succeed(1) : reject(new Error('Failed to resolve')))),
	),
	succeed: boolean().default(false),
};

const schemaObject = {
	nested: object(schema),
};

const schemaArray = {
	nested: array(object(schema)),
};

const resolvedSchema = {
	async: int(),
	succeed: boolean(),
};

test('resolver - fail on resolve', async () => {
	const model = createModel(schema);
	const resolved = resolver(model());

	await expect(resolved).rejects.toThrow();
});

test('resolver - succeed on resolve', async () => {
	const model = createModel(schema);
	const data = await resolver(model({ succeed: true }));

	expect(data).toEqual({ async: 1, succeed: true });
});

test('resolver - matches resolvedSchema', async () => {
	const model = createModel(schema);
	const data = await resolver(model({ succeed: true }));
	const resolvedData = createModel(resolvedSchema)(data);

	expect(resolvedData).toEqual({ async: 1, succeed: true });
});

test('resolver - gives back modeled object', async () => {
	const model = createModel(schema);
	const data = await resolver(model({ succeed: true }), resolvedSchema);

	// This test wouldn't pass if we succeed in changing the type of the computed value
	expect(() => {
		data.async = 'string';
	}).toThrow();
});

test('resolver - deep nested object', async () => {
	const model = createModel(schemaObject);
	const data = await resolver(model({ nested: { succeed: true } }));

	expect(data).toEqual({ nested: { async: 1, succeed: true } });
});

test('resolver - deep nested array', async () => {
	const model = createModel(schemaArray);
	const data = await resolver(model({ nested: [{ succeed: true }] }));

	expect(data).toEqual({ nested: [{ async: 1, succeed: true }] });
});

test('resolver - deep nested object fail', () => {
	const model = createModel(schemaObject);
	const data = resolver(model({ nested: {} }));

	expect(data).rejects.toThrow();
});

test('resolver - deep nested array fail', () => {
	const model = createModel(schemaArray);
	const data = resolver(model({ nested: [{}] }));

	expect(data).rejects.toThrow();
});
