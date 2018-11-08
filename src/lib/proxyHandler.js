/* eslint max-params: off */
const parseValue = require('./parseValue');

const get = (schema, target, property) => {
	if (schema[property]) {
		return schema[property].fn ? schema[property].fn(target, property) : target[property];
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
		throw new Error(`${property} is not a property of model`);
	}

	target[property] = parseValue(schema[property], property, value);

	return true;
};

const proxyHandler = (schema) => ({
	get: (target, property) => get(schema, target, property),
	getOwnPropertyDescriptor: (target, property) => getOwnPropertyDescriptor(schema, target, property),
	ownKeys: (target) => ownKeys(schema, target),
	set: (target, property, value) => set(schema, target, property, value),
});

module.exports = proxyHandler;
