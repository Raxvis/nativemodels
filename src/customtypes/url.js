const base = require('./../datatypes/base');

const url = () => ({
	...base,
	validate: (value, name) => {
		if (/^(https?|ftp):\/\/(-\.)?([^\s/?.#-]+\.?)+(\/[^\s]*)?$/iu.test(value)) {
			return true;
		}

		throw new Error(`Property ${name} (${value}) is not a URL`);
	},
});

module.exports = url;
