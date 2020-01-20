const strictCheck = (schema, record) => {
	const extraKeys = Object.keys(record).filter((key) => !schema[key]);

	if (extraKeys.length) {
		throw new Error(`NativeModels - Properties: '${extraKeys.join()}' not defined in the schema`);
	}
};

module.exports = strictCheck;
