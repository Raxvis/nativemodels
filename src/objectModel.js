/* eslint consistent-return:off */

export const objectModel = (schema) => (record = {}) => {
	const recordKeys = Object.keys(record);
	const schemaKeys = Object.keys(schema);
	const parsedRecord = {};

	schemaKeys.forEach((key) => {
		if (schema[key].isRequired && !record[key]) {
			throw new Error(`Property: '${key}' is required`);
		}
		if (schema[key].hasDefault && !record[key]) {
			parsedRecord[key] = schema[key].defaultValue;
		}
	});

	recordKeys.forEach((key) => {
		if (schemaKeys.indexOf(key) > -1) {
			parsedRecord[key] = schema[key].parse(record[key]);
		}
	});

	schemaKeys.forEach((key) => {
		if (schema[key].fn) {
			parsedRecord[key] = schema[key].fn(parsedRecord);
		}
	});

	return new Proxy(parsedRecord, {
		get: (target, property) => {
			if (schema[property]) {
				if (schema[property].fn) {
					return schema[property].fn(target);
				}

				return target[property];
			}

			return false;
		},
		set: (target, property, value) => {
			if (schema[property]) {
				target[property] = value;

				return true;
			}

			throw new Error(`${property} is not a property of model`);
		},
	});
};

export default objectModel;
