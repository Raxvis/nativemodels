const {
	createModel,
	datatypes: { computed, string },
} = require('./../../src');

test(`boolean operations on computed value`, () => {
	const schema = {
		bar: string(),
		foo: computed((record) => {
			if (record.bar === 'bar') {
				return true;
			}

			return false;
		}),
	};

	const model = createModel(schema);

	expect(model({ bar: 'bar' }).foo).toEqual(true);
	expect(
		(() => {
			const data = model({ bar: 'bar' });

			if (data.foo) {
				return true;
			}

			return false;
		})(),
	).toEqual(true);
	expect(model({ bar: 'baz' }).foo).toEqual(false);
});
