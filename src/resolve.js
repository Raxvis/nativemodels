/* eslint-disable no-use-before-define */
const createModel = require('./createModel');

const cascadeResolve = (value) => {
	if (Array.isArray(value)) {
		return Promise.all(value.map(cascadeResolve));
	} else if (typeof value === 'object' && !value.then) {
		return resolve(value);
	}

	return value;
};

const resolve = async (data, schema) => {
	const keys = Object.keys(data);
	const values = await Promise.all(keys.map((key) => cascadeResolve(data[key])));
	const resolved = keys.reduce((result, key, index) => Object.assign(result, { [key]: values[index] }), {});

	return schema ? createModel(schema)(resolved) : resolved;
};

module.exports = resolve;
