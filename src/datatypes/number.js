import base from './base';

const number = () => ({
	...base,
	parse(value) {
		if (value === true || value === false || value === '') {
			throw new Error('Not a number');
		}

		if (!isNaN(Number(value))) {
			return Number(value);
		}

		throw new Error('Not a number');
	},
});

export default number;
