import objectModel from './objectModel';

export const arrayModel = (schema) => (records = []) => {
	const model = objectModel(schema);

	return records.map((record) => model(record));
};

export default arrayModel;
