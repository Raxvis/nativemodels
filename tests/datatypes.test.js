/* global test, expect */

const { createModel, datatypes } = require('./source');

const types = {
	array: {
		invalid: ['string', false, '', true, 100, 100.2, {}],
		valid: [[]],
	},
	boolean: {
		invalid: [],
		valid: [true, false],
	},
	date: {
		invalid: ['string', 100.0, false],
		valid: [new Date()],
	},
	float: {
		invalid: ['string', false, '', true],
		valid: [100, 100.0, 1.2],
	},
	int: {
		invalid: ['string', false, '', true, 100.2],
		valid: [100, 100.0],
	},
	object: {
		invalid: ['string', false, '', true, 100, 100.2],
	},
	string: {
		invalid: [],
		valid: ['string'],
	},
};

test('test basic valid / invalid datatypes', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].valid) {
			types[type].valid.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]() });
				const record = model({ [type]: value });

				expect(record[type]).toEqual(value);
			});
		}

		if (types[type].invalid) {
			types[type].invalid.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]() });

				expect(() => {
					model({ [type]: value });
				}).toThrow();
			});
		}
	});
});

test('ensure required works on all data types', () => {
	Object.keys(types).forEach((type) => {
		const model = createModel({ [type]: datatypes[type]().required() });

		expect(() => {
			model();
		}).toThrow();
	});
});

test('ensure default works on all data types', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].valid) {
			types[type].valid.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]().default(value) });
				const record = model();

				expect(record[type]).toEqual(value);
			});
		}
	});
});

test('ensure nullable works on all data types', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].valid) {
			types[type].valid.forEach(() => {
				const model = createModel({ [type]: datatypes[type]().nullable() });
				const record = model({ [type]: null });

				expect(record[type]).toEqual(null);
			});
		}
	});
});

test('extending with bad validate throws error', () => {
	const customType = () => ({
		...datatypes.base,
		validate() {
			return false;
		},
	});

	const model = createModel({ foo: customType() });

	expect(() => {
		model({ foo: 'bar' });
	}).toThrow();
});
