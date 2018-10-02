/* eslint-disable no-use-before-define */
const createModel = require('./createModel');

const cascadeResolve = (value) => {
	if (Array.isArray(value)) {
		return Promise.all(value.map(cascadeResolve));
	} else if (typeof value === 'object' && !value.then) {
		return resolver(value);
	}

	return value;
};

const resolved = (keys, values, schema) => {
	const data = keys.reduce((result, key, index) => ({ ...result, [key]: values[index] }), {});

	return schema ? createModel(schema)(data) : data;
};

const resolver = (data, schema) =>
	new Promise((resolve, reject) => {
		const keys = Object.keys(data);

		Promise.all(keys.map((key) => cascadeResolve(data[key])))
			.then((values) => resolved(keys, values, schema), reject)
			.then(resolve);
	});

module.exports = resolver;
