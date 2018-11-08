const {
	createModel,
	datatypes: { array, computed, int, object, string },
	resolver,
} = require('./../source');

const sleep = (time = 1) =>
	new Promise((resolve) =>
		setTimeout(() => {
			resolve(time);
		}, time),
	);

const buildFullName = (record) => `${record.firstName} ${record.lastName}`;

test('datatype | computed - basic test', () => {
	const model = createModel({ firstName: string(), fullName: computed(buildFullName), lastName: string() });
	const user = model({ firstName: 'John', lastName: 'Smith' });

	expect(user.fullName).toEqual('John Smith');
	user.firstName = 'James';
	expect(user.fullName).toEqual('James Smith');
});

test('datatype | computed - deep nested object', () => {
	const model = createModel({
		bar: object({ bar: computed((record) => record.foo), foo: string() }),
		foo: string(),
	});
	const data = model({
		bar: { foo: 'baz' },
		foo: 'bar',
	});

	expect(data.bar.bar).toEqual('baz');
});

test('datatype | computed - deep nested array', () => {
	const model = createModel({
		bar: array(
			object({
				bar: computed((record) => record.foo),
				foo: string(),
			}),
		),
		foo: string(),
	});
	const data = model({
		bar: [{ foo: 'baz' }, { foo: 'bat' }],
		foo: 'bar',
	});

	expect(data.bar[0].bar).toEqual('baz');
	expect(data.bar[1].bar).toEqual('bat');
});

test('datatype | computed - resolved deep nested object', async () => {
	const model = createModel({
		bar: object({
			bar: computed((record) => new Promise((success) => success(record.foo))),
			foo: string(),
		}),
		foo: string(),
	});
	const data = model({
		bar: { foo: 'baz' },
		foo: 'bar',
	});
	const resolved = await resolver(data);

	expect(resolved.bar.bar).toEqual('baz');
});

test('datatype | computed - resolved deep nested array', async () => {
	const model = createModel({
		bar: array(
			object({
				bar: computed((record) => new Promise((success) => success(record.foo))),
				foo: string(),
			}),
		),
		foo: string(),
	});
	const data = model({
		bar: [{ foo: 'baz' }, { foo: 'bat' }],
		foo: 'bar',
	});
	const resolved = await resolver(data);

	expect(resolved.bar[0].bar).toEqual('baz');
	expect(resolved.bar[1].bar).toEqual('bat');
});

test(`computed accessed only when called`, () => {
	let count = 0;
	const data = createModel({
		computed: computed(() => {
			count += 1;

			return count;
		}),
	})({});

	expect(data.computed).toEqual(1);
	Object.keys(data);
	expect(data.computed).toEqual(2);
});

test(`computed accessed only when called - deeply nested`, () => {
	let count = 0;
	const schema = {
		computed: computed(() => {
			count += 1;

			return count;
		}),
	};
	const parentSchema = { object: object(schema) };

	const data = createModel(parentSchema)({ object: {} });

	expect(data.object.computed).toEqual(1);
	Object.keys(data.object);
	expect(data.object.computed).toEqual(2);
});

test(`computed accessed only when called - deeply nested array`, () => {
	let count = 0;
	const schema = {
		computed: computed(() => {
			count += 1;

			return count;
		}),
	};
	const parentSchema = { object: array(object(schema)) };
	const data = createModel(parentSchema)({ object: [{}] });

	expect(data.object[0].computed).toEqual(1);
	Object.keys(data.object[0]);
	expect(data.object[0].computed).toEqual(2);
});

test(`computed accessed only when called with async`, async () => {
	let count = 0;
	const data = createModel({
		computed: computed(async () => {
			count += 1;
			await sleep(1);

			return count;
		}),
	})({});

	expect(resolver(data)).resolves.toEqual({ computed: 1 });
	await sleep(10);
	Object.keys(data);
	await sleep(10);
	expect(resolver(data)).resolves.toEqual({ computed: 2 });
});

test(`computed accessed only when called with async - deeply nested`, async () => {
	let count = 0;
	const schema = {
		computed: computed(async () => {
			await sleep(1);
			count += 1;

			return count;
		}),
	};

	const data = createModel({ object: object(schema) })({ object: {} });

	expect(resolver(data)).resolves.toEqual({ object: { computed: 1 } });
	await sleep(10);
	Object.keys(data.object);
	await sleep(10);
	expect(resolver(data)).resolves.toEqual({ object: { computed: 2 } });
});

test(`computed accessed only when called with async - deeply nested with array`, async () => {
	let count = 0;
	const schema = {
		computed: computed(async () => {
			count += 1;
			await sleep(1);

			return count;
		}),
	};

	const data = createModel({ object: array(object(schema)) })({ object: [{}] });

	expect(resolver(data)).resolves.toEqual({ object: [{ computed: 1 }] });
	await sleep(10);
	Object.keys(data.object[0]);
	await sleep(10);
	expect(resolver(data)).resolves.toEqual({ object: [{ computed: 2 }] });
});

test(`computed still shows as key`, () => {
	const data = createModel({ computed: computed(() => 1) })({});

	expect(Object.keys(data)).toEqual(['computed']);
});

test(`computed accepts a type`, () => {
	const data = createModel({ computed: computed(() => 1, int()) })({});

	expect(data.computed).toEqual(1);
});

test(`computed accepts a type`, () => {
	const data = createModel({ computed: computed(() => undefined, int()) })({});

	expect(data.computed).toEqual(undefined);
});

test(`computed won't accept a bad type`, () => {
	const data = createModel({ computed: computed(() => 'foo', int()) })({});

	expect(() => data.computed).toThrow('Property computed is not an int');
});

test(`computed won't accept an undefined required type`, () => {
	const data = createModel({ computed: computed(() => undefined, int().required()) })({});

	expect(() => data.computed).toThrow(`Property: 'computed' is required`);
});

test(`computed accepts a type with async and passes`, async () => {
	const data = createModel({ computed: computed(() => sleep(1), int()) })({});
	const value = await data.computed;

	expect(value).toEqual(1);
	expect(data.computed).resolves.toEqual(1);
});

test(`computed accepts a type with async and fails`, () => {
	const data = createModel({
		computed: computed(async () => {
			await sleep(1);

			return 'foo';
		}, int()),
	})({});

	expect(data.computed).rejects.toThrow('Property computed is not an int');
});

test(`computed allows override`, () => {
	const data = createModel({ computed: computed(() => 1, int(), { allowOverride: true }) })({});

	data.computed = 2;

	expect(data.computed).toEqual(2);
});

test(`computed allows override with no type`, () => {
	const data = createModel({ computed: computed(() => 1, undefined, { allowOverride: true }) })({});

	data.computed = 2;

	expect(data.computed).toEqual(2);
});
