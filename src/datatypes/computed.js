const base = require('./base');
const createModel = require('./../createModel');

const parseValue = (type, key, value) => createModel({ [key]: type })({ [key]: value })[key];

const isAsync = (fn) => fn && (fn.then || fn.constructor.name === 'AsyncFunction');

const resolve = (response, type, key) => Promise.resolve(response).then((value) => parseValue(type, key, value));

const computeWithType = (userFn, type, { key, record }) => {
	if (isAsync(userFn)) {
		return resolve(userFn(record, key), type, key);
	}

	const response = userFn(record, key);

	return isAsync(response) ? resolve(response, type, key) : parseValue(type, key, response);
};

const computed = (userFn, type, options = { allowOverride: false }) => ({
	...base,
	fn: (record, key) => {
		if (options.allowOverride && record[key]) {
			return type ? parseValue(type, key, record[key]) : record[key];
		} else if (type) {
			return computeWithType(userFn, type, { key, record });
		}

		return userFn(record, key);
	},
});

module.exports = computed;
