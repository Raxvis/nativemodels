const createType = require('./../createType');
const { isBuffer } = require('./../lib/checks/types');

const bufferCheck = (key, value, strict) => {
	if (isBuffer(value)) {
		return true;
	}

	if (!strict && isBuffer(Buffer.from(value))) {
		return true;
	}

	throw new Error(`NativeModels - Property ${key} is not a buffer`);
};

const buffer = () =>
	createType({
		name: 'buffer',
		parse: (key, value) => Buffer.from(value),
		strictCheck: (key, value) => bufferCheck(key, value, true),
		validCheck: (key, value) => bufferCheck(key, value),
	});

module.exports = buffer;
