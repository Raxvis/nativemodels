const { createModel, datatypes } = require('./source');

const types = {
	array: {
		invalid: ['string', false, '', true, 100, 100.2, {}],
		invalidStrict: [],
		strict: [[]],
		valid: [[]],
	},
	boolean: {
		invalid: [],
		invalidStrict: ['true', 'false'],
		strict: [true, false],
		valid: [true, false, 'true', 'false'],
	},
	date: {
		invalid: ['string', false],
		invalidStrict: [100.0, '2018-10-01 00:00:00'],
		strict: [new Date()],
		valid: [new Date(), 100.0, '2018-10-01 00:00:00'],
	},
	float: {
		invalid: ['string', false, '', true],
		invalidStrict: ['1.2'],
		strict: [1.2],
		valid: [100, 100.0, 1.2, '1.2'],
	},
	int: {
		invalid: ['string', false, '', true, 100.2],
		invalidStrict: ['100'],
		strict: [100],
		valid: [100, 100.0, '100'],
	},
	object: {
		invalid: ['string', false, '', true, 100, 100.2],
	},
	string: {
		invalid: [],
		invalidStrict: [1],
		strict: ['1'],
		valid: ['string'],
	},
};

test('test basic valid / invalid datatypes', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].valid) {
			types[type].valid.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]() });
				const record = model({ [type]: value });
				const { parse } = datatypes[type]();

				expect(record[type]).toEqual(parse('', value));
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

test('test strict', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].strict) {
			types[type].strict.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]().strict() });
				const record = model({ [type]: value });
				const { parse } = datatypes[type]();

				expect(record[type]).toEqual(parse('', value));
			});
		}
	});
});

test('test invalid strict', () => {
	Object.keys(types).forEach((type) => {
		if (types[type].invalidStrict) {
			types[type].invalidStrict.forEach((value) => {
				const model = createModel({ [type]: datatypes[type]().strict() });

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
				const { parse } = datatypes[type]();

				expect(record[type]).toEqual(parse('', value));
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

test('extending with bad validCheck throws error', () => {
	const customType = () => ({
		...datatypes.base,
		validCheck() {
			throw new Error('failed');
		},
	});

	const model = createModel({ foo: customType() });

	expect(() => {
		model({ foo: 'bar' });
	}).toThrow();
});
