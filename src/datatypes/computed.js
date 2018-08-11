import base from './base';

const computed = (fn) => ({
	...base,
	fn,
});

export default computed;
