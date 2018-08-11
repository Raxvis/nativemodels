import base from './base';

const boolean = () => ({
	...base,
	parse(value) {
		return Boolean(value);
	},
});

export default boolean;
