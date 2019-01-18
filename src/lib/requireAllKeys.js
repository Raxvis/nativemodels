const strictCheck = (schema, record) =>
	Object.keys(record).forEach((key) => {
		if (!schema[key]) {
			throw new Error(`NativeModels - Property: '${key}' is not defined in the schema`);
		}
	});

module.exports = strictCheck;
