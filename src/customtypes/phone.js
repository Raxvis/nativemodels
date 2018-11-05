const base = require('./../datatypes/base');

const phone = () => ({
	...base,
	validate: (key, value) => {
		if (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/iu.test(value)) {
			return true;
		}

		throw new Error(`Property ${key} (${value}) is not a Phone Number`);
	},
});

module.exports = phone;
