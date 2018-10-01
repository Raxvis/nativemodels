/* global test, expect */

const {
	createModel,
	datatypes: { array, boolean, computed, int, object },
	resolve,
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

test('resolve - fail on resolve', async () => {
	const model = createModel(schema);
	const resolved = resolve(model());

	await expect(resolved).rejects.toThrow();
});

test('resolve - succeed on resolve', async () => {
	const model = createModel(schema);
	const data = await resolve(model({ succeed: true }));

	expect(data).toEqual({ async: 1, succeed: true });
});

test('resolve - matches resolvedSchema', async () => {
	const model = createModel(schema);
	const data = await resolve(model({ succeed: true }));
	const resolvedData = createModel(resolvedSchema)(data);

	expect(resolvedData).toEqual({ async: 1, succeed: true });
});

test('resolve - gives back modeled object', async () => {
	const model = createModel(schema);
	const data = await resolve(model({ succeed: true }), resolvedSchema);

	// This test wouldn't pass if we succeed in changing the type of the computed value
	expect(() => {
		data.async = 'string';
	}).toThrow();
});

test('resolve - deep nested object', async () => {
	const model = createModel(schemaObject);
	const data = await resolve(model({ nested: { succeed: true } }));

	expect(data).toEqual({ nested: { async: 1, succeed: true } });
});

test('resolve - deep nested array', async () => {
	const model = createModel(schemaArray);
	const data = await resolve(model({ nested: [{ succeed: true }] }));

	expect(data).toEqual({ nested: [{ async: 1, succeed: true }] });
});

test('resolve - deep nested object fail', () => {
	const model = createModel(schemaObject);
	const data = resolve(model({ nested: {} }));

	expect(data).resolves.toThrow();
});

test('resolve - deep nested array fail', () => {
	const model = createModel(schemaArray);
	const data = resolve(model({ nested: [{}] }));

	expect(data).resolves.toThrow();
});
