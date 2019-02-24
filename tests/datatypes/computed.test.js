const {
	createModel,
	datatypes: { array, computed, int, object, string },
	resolve,
} = require('./../../src');

const sleep = (time = 1) =>
	new Promise((res) =>
		setTimeout(() => {
			res(time);
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
	const data = model({ bar: { foo: 'baz' }, foo: 'bar' });

	expect(data.bar.bar).toEqual('baz');
});

test('datatype | computed - deep nested array', () => {
	const model = createModel({
		bar: array(object({ bar: computed((record) => record.foo), foo: string() })),
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
		bar: object({ bar: computed((record) => new Promise((success) => success(record.foo))), foo: string() }),
		foo: string(),
	});
	const data = model({ bar: { foo: 'baz' }, foo: 'bar' });
	const resolved = await resolve(data);

	expect(resolved.bar.bar).toEqual('baz');
});

test('datatype | computed - resolved deep nested array', async () => {
	const model = createModel({
		bar: array(object({ bar: computed((record) => new Promise((success) => success(record.foo))), foo: string() })),
		foo: string(),
	});
	const data = model({ bar: [{ foo: 'baz' }, { foo: 'bat' }], foo: 'bar' });
	const resolved = await resolve(data);

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

	expect(resolve(data)).resolves.toEqual({ computed: 1 });
	await sleep(10);
	Object.keys(data);
	await sleep(10);
	expect(resolve(data)).resolves.toEqual({ computed: 2 });
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

	expect(resolve(data)).resolves.toEqual({ object: { computed: 1 } });
	await sleep(10);
	Object.keys(data.object);
	await sleep(10);
	expect(resolve(data)).resolves.toEqual({ object: { computed: 2 } });
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

	expect(resolve(data)).resolves.toEqual({ object: [{ computed: 1 }] });
	await sleep(10);
	Object.keys(data.object[0]);
	await sleep(10);
	expect(resolve(data)).resolves.toEqual({ object: [{ computed: 2 }] });
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

test(`computed allows override fails if incorrect type`, () => {
	const data = createModel({ computed: computed(() => 1, int(), { allowOverride: true }) })({});

	expect(() => {
		data.computed = 'bar';
	}).toThrow();
});

test(`computed override doesn't fail if not allowed and incorrect type`, () => {
	const data = createModel({ computed: computed(() => 1, int()) })({});

	data.computed = 'bar';

	expect(data.computed).toEqual(1);
});

test(`context is passed to computed`, () => {
	const data = createModel({ computed: computed((record, key, context) => context) }, {}, { foo: 'bar' })({});

	expect(data.computed).toEqual({ foo: 'bar' });
});

test(`console.log looks correct`, () => {
	const userSchema = {
		firstName: string(),
		fullName: computed((record) => `${record.firstName} ${record.lastName}`),
		lastName: string(),
	};
	const userData = { firstName: 'John', lastName: 'Smith' };
	const userModel = createModel(userSchema);
	const user = userModel(userData);

	console.log(user);

	expect(user).toEqual({
		firstName: 'John',
		fullName: 'John Smith',
		lastName: 'Smith',
	});
});
