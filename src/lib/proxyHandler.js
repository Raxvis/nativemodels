/* eslint max-params: off */
const parseValue = require('./parseValue');

const get = (schema, target, property, context) => {
	if (schema[property]) {
		return schema[property].fn ? schema[property].fn(target, property, context) : target[property];
	}

	return undefined;
};

const getOwnPropertyDescriptor = (schema, target, property) => ({
	configurable: true,
	enumerable: true,
	value: schema[property].fn ? undefined : target[property],
	writable: true,
});

const ownKeys = (schema, target) => [...Object.keys(target), ...Object.keys(schema).filter((key) => schema[key].fn)];

const set = (schema, target, property, value) => {
	if (!schema[property]) {
		throw new Error(`NativeModels - ${property} is not a property of model`);
	}

	const type = schema[property].fn && schema[property].type ? schema[property].type : schema[property];

	target[property] = parseValue(type, property, value);

	return true;
};

const proxyHandler = (schema, options, context) => ({
	get: (target, property) => get(schema, target, property, context),
	getOwnPropertyDescriptor: (target, property) => getOwnPropertyDescriptor(schema, target, property),
	ownKeys: (target) => ownKeys(schema, target),
	set: (target, property, value) => set(schema, target, property, value),
});

module.exports = proxyHandler;
