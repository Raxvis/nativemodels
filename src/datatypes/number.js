import base from './base';

const number = () => ({
	...base,
	parse(value, name) {
		if (value === true || value === false || value === '') {
			throw new Error(`Property ${name} is not a number`);
		}

		if (!isNaN(Number(value))) {
			return Number(value);
		}

		throw new Error(`Property ${name} is not a number`);
	},
});

export default number;
