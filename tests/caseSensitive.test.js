const {
	createModel,
	datatypes: { array, object, string },
} = require('./../src');

const data = {
	foo: 'bar',
};

const schema = {
	foo: string(),
};

test('caseSensitive - normal test', async () => {
	const model = createModel(schema, { caseSensitive: false });
	const result = model({ foo: 'bar' });

	await expect(result).toEqual(data);
});

test('caseSensitive - uppercase test', async () => {
	const model = createModel(schema, { caseSensitive: false });
	const result = model({ FOO: 'bar' });

	await expect(result).toEqual(data);
});

test('caseSensitive - case test with extra data', async () => {
	const model = createModel(schema, { caseSensitive: false });
	const result = model({ FOO: 'bar', foz: 'baz' });

	await expect(result).toEqual(data);
});

test('caseSensitive - mixedcase test', async () => {
	const model = createModel(schema, { caseSensitive: false });
	const result = model({ Foo: 'bar' });

	await expect(result).toEqual(data);
});

test('caseSensitive - fail after init test', async () => {
	const model = createModel(schema);
	const result = model();

	await expect(() => {
		result.FOO = 'bar';
	}).toThrow();
});

test('caseSensitive - object test', async () => {
	const model = createModel({ nested: object(schema, { caseSensitive: false }) }, { caseSensitive: false });
	const modelDeep = createModel({ nested: object(schema, { caseSensitive: false }) });
	const modelShallow = createModel({ nested: object(schema) }, { caseSensitive: false });

	await expect(model({ nested: { Foo: 'bar' } }).nested).toEqual(data);
	await expect(model({ Nested: { Foo: 'bar' } }).nested).toEqual(data);
	await expect(modelDeep({ nested: { Foo: 'bar' } }).nested).toEqual(data);
	await expect(modelDeep({ Nested: { Foo: 'bar' } }).nested).toEqual(undefined);
	await expect(modelShallow({ nested: { Foo: 'bar' } }).nested).toEqual({});
	await expect(modelShallow({ Nested: { Foo: 'bar' } }).nested).toEqual({});
});

test('caseSensitive - array test', async () => {
	const model = createModel({ nested: array(object(schema, { caseSensitive: false })) }, { caseSensitive: false });
	const modelDeep = createModel({ nested: array(object(schema, { caseSensitive: false })) });
	const modelShallow = createModel({ nested: array(object(schema)) }, { caseSensitive: false });

	await expect(model({ nested: [{ Foo: 'bar' }] }).nested[0]).toEqual(data);
	await expect(model({ Nested: [{ Foo: 'bar' }] }).nested[0]).toEqual(data);
	await expect(modelDeep({ nested: [{ Foo: 'bar' }] }).nested[0]).toEqual(data);
	await expect(modelDeep({ Nested: [{ Foo: 'bar' }] }).nested).toEqual(undefined);
	await expect(modelShallow({ nested: [{ Foo: 'bar' }] }).nested[0]).toEqual({});
	await expect(modelShallow({ Nested: [{ Foo: 'bar' }] }).nested[0]).toEqual({});
});

test('caseSensitive - passOptions', () => {
	const model = createModel({ nested: object(schema) }, { caseSensitive: false, passOptions: true });
	const modelWithOptionOverrides = createModel(
		{ nested: object(schema, { caseSensitive: true }) },
		{ caseSensitive: false, passOptions: true },
	);

	expect(model({ nested: { Foo: 'bar' } }).nested).toEqual(data);
	expect(model({ Nested: { Foo: 'bar' } }).nested).toEqual(data);
	expect(modelWithOptionOverrides({ nested: { Foo: 'bar' } }).nested).toEqual({});
	expect(modelWithOptionOverrides({ Nested: { Foo: 'bar' } }).nested).toEqual({});
});
