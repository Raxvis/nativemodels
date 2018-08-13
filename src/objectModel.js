/* eslint consistent-return:off */

const requiredCheck = (schema, record) =>
	Object.keys(schema).forEach((key) => {
		if (schema[key].isRequired && !record[key]) {
			throw new Error(`Property: '${key}' is required`);
		}
	});

const defaultRecord = (schema, record) =>
	Object.keys(schema).reduce(
		(result, key) => ({
			...result,
			...(schema[key].hasDefault && !record[key] ? { [key]: schema[key].defaultValue } : {}),
		}),
		{},
	);

const parseRecord = (schema, record, defaultedRecord) =>
	Object.keys(record).reduce(
		(result, key) => ({
			...result,
			...(schema[key] ? { [key]: schema[key].parse(record[key], key) } : {}),
		}),
		defaultedRecord,
	);

const handler = (schema) => ({
	get: (target, property) => {
		if (schema[property]) {
			return schema[property].fn ? schema[property].fn(target) : target[property];
		}

		return false;
	},
	getOwnPropertyDescriptor: (target, property) => ({
		configurable: true,
		enumerable: true,
		value: schema[property].fn ? schema[property].fn(target) : target[property],
		writable: true,
	}),
	ownKeys: (target) => [...Object.keys(target), ...Object.keys(schema).filter((key) => schema[key].fn)],
	set: (target, property, value) => {
		if (!schema[property]) {
			throw new Error(`${property} is not a property of model`);
		}

		target[property] = value;

		return true;
	},
});

export const objectModel = (schema) => (record = {}) => {
	requiredCheck(schema, record);

	return new Proxy(parseRecord(schema, record, defaultRecord(schema, record)), handler(schema));
};

export default objectModel;
