/* global test, expect */

const { objectModel, datatypes } = require('./../dist');

const types = {
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
	string: {
		invalid: [],
		valid: ['string'],
	},
};

test('test basic valid / invalid datatypes', () => {
	Object.keys(types).forEach((type) => {
		types[type].valid.forEach((value) => {
			const model = objectModel({ [type]: datatypes[type]() });
			const record = model({ [type]: value });

			expect(record[type]).toEqual(value);
		});
		types[type].invalid.forEach((value) => {
			const model = objectModel({ [type]: datatypes[type]() });

			expect(() => {
				model({ [type]: value });
			}).toThrow();
		});
	});
});

test('ensure required works on all data types', () => {
	Object.keys(types).forEach((type) => {
		const model = objectModel({ [type]: datatypes[type]().required() });

		expect(() => {
			model();
		}).toThrow();
	});
});

test('ensure default works on all data types', () => {
	Object.keys(types).forEach((type) => {
		types[type].valid.forEach((value) => {
			const model = objectModel({ [type]: datatypes[type]().default(value) });
			const record = model();

			expect(record[type]).toEqual(value);
		});
	});
});
