const requiredCheck = (schema, record) =>
	Object.keys(schema).forEach((key) => {
		if (schema[key].isRequired && !record[key] && !schema[key].defaultValue) {
			throw new Error(`Property: '${key}' is required`);
		}
	});

module.exports = requiredCheck;
