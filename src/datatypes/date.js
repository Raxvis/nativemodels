import base from './base';

const date = () => ({
	...base,
	parse(value, name) {
		if (value instanceof Date) {
			return value;
		}

		throw new Error(`Property ${name} is not a date`);
	},
});

export default date;
