const {
	createModel,
	datatypes: { array, object, string },
} = require('./source');

const schema = {
	foo: string(),
};

test('strict - normal test', async () => {
	const model = createModel(schema, { strict: false });

	await expect(model({ foz: 'bar' })).toEqual({});
});

test('strict - strict enabled test', async () => {
	const model = createModel(schema, { strict: true });

	await expect(() => {
		model({ foz: 'bar' });
	}).toThrow();
	await expect(() => {
		model({ foo: 'bar', foz: 'bar' });
	}).toThrow();
});

test('strict - object test', async () => {
	const model = createModel({ nested: object(schema, { strict: true }) }, { strict: true });
	const modelDeep = createModel({ nested: object(schema, { strict: true }) });
	const modelShallow = createModel({ nested: object(schema) }, { strict: true });

	await expect(() => {
		const res = model({ nested: { Foo: 'bar' } });

		console.log(res);

		throw new Error();
	}).toThrow();
	await expect(() => {
		model({ nestedd: { foo: 'bar' } });
	}).toThrow();
	await expect(() => {
		modelDeep({ nested: { Foo: 'bar' } });
	}).toThrow();
	await expect(modelDeep({ nestedd: { foo: 'bar' } }).nested).toEqual(undefined);
	await expect(() => {
		modelShallow({ nestedd: { foo: 'bar' } });
	}).toThrow();
	await expect(modelShallow({ nested: { Foo: 'bar' } }).nested).toEqual({});
});

test('strict - array test', async () => {
	const model = createModel({ nested: array(object(schema, { strict: true })) }, { strict: true });
	const modelDeep = createModel({ nested: array(object(schema, { strict: true })) });
	const modelShallow = createModel({ nested: array(object(schema)) }, { strict: true });

	await expect(() => {
		model({ nested: [{ Foo: 'bar' }] });
	}).toThrow();
	await expect(() => {
		model({ nestedd: [{ foo: 'bar' }] });
	}).toThrow();
	await expect(() => {
		modelDeep({ nested: [{ Foo: 'bar' }] });
	}).toThrow();
	await expect(modelDeep({ nestedd: [{ foo: 'bar' }] }).nested).toEqual(undefined);
	await expect(() => {
		modelShallow({ nestedd: [{ foo: 'bar' }] });
	}).toThrow();
	await expect(modelShallow({ nested: [{ Foo: 'bar' }] }).nested[0]).toEqual({});
});
