const base = require('./../datatypes/base');

const url = () => ({
	...base,
	validCheck: (key, value) => {
		if (/^(https?|ftp):\/\/(-\.)?([^\s/?.#-]+\.?)+(\/[^\s]*)?$/iu.test(value)) {
			return true;
		}

		throw new Error(`Property ${key} (${value}) is not a URL`);
	},
});

module.exports = url;
