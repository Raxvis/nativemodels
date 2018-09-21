const objectModel = require('./objectModel');

const arrayModel = (schema) => (records = []) => {
	const model = objectModel(schema);

	return records.map((record) => model(record));
};

module.exports = arrayModel;
