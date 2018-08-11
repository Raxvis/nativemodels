import base from './base';

const date = () => ({
	...base,
	parse(value) {
		if (value instanceof Date) {
			return value;
		}

		throw new Error('Not a date');
	},
});

export default date;
