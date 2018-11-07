const {
	createModel,
	datatypes: { array, computed, object, string },
	resolver,
} = require('./../source');

const sleep = (time) =>
	new Promise((resolve) =>
		setTimeout(() => {
			resolve();
		}, time),
	);

test('datatype | computed - basic test', () => {
	const schema = {
		firstName: string(),
		fullName: computed((record) => `${record.firstName} ${record.lastName}`),
		lastName: string(),
	};
	const model = createModel(schema);
	const user = model({
		firstName: 'John',
		lastName: 'Smith',
	});

	expect(user.fullName).toEqual('John Smith');
	user.firstName = 'James';
	expect(user.fullName).toEqual('James Smith');
});

test('datatype | computed - deep nested object', () => {
	const schema = {
		bar: object({
			bar: computed((record) => record.foo),
			foo: string(),
		}),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: {
			foo: 'baz',
		},
		foo: 'bar',
	});

	expect(data.bar.bar).toEqual('baz');
});

test('datatype | computed - deep nested array', () => {
	const schema = {
		bar: array(
			object({
				bar: computed((record) => record.foo),
				foo: string(),
			}),
		),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: [
			{
				foo: 'baz',
			},
			{
				foo: 'bat',
			},
		],
		foo: 'bar',
	});

	expect(data.bar[0].bar).toEqual('baz');
	expect(data.bar[1].bar).toEqual('bat');
});

test('datatype | computed - resolved deep nested object', async () => {
	const schema = {
		bar: object({
			bar: computed((record) => new Promise((success) => success(record.foo))),
			foo: string(),
		}),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: {
			foo: 'baz',
		},
		foo: 'bar',
	});
	const resolved = await resolver(data);

	expect(resolved.bar.bar).toEqual('baz');
});

test('datatype | computed - resolved deep nested array', async () => {
	const schema = {
		bar: array(
			object({
				bar: computed((record) => new Promise((success) => success(record.foo))),
				foo: string(),
			}),
		),
		foo: string(),
	};
	const model = createModel(schema);
	const data = model({
		bar: [
			{
				foo: 'baz',
			},
			{
				foo: 'bat',
			},
		],
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

	const parentSchema = {
		object: object(schema),
	};

	const data = createModel(parentSchema)({ object: {} });

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

	const parentSchema = {
		object: array(object(schema)),
	};

	const data = createModel(parentSchema)({ object: [{}] });

	expect(resolver(data)).resolves.toEqual({ object: [{ computed: 1 }] });
	await sleep(10);
	Object.keys(data.object[0]);
	await sleep(10);
	expect(resolver(data)).resolves.toEqual({ object: [{ computed: 2 }] });
});

test(`computed still shows as key`, () => {
	const schema = { computed: computed(() => 1) };
	const data = createModel(schema)({});
	const keys = Object.keys(data);

	expect(keys).toEqual(['computed']);
});
