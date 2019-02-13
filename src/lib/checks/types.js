// Pre ES5 => value && typeof value === 'object' && value.constructor === Array;
const isArray = (value) => Array.isArray(value);
const isBoolean = (value) => typeof value === 'boolean';
const isBuffer = (value) => Buffer.isBuffer(value);
const isDate = (value) => value instanceof Date;
// const isError = (value) => value instanceof Error && typeof value.message !== 'undefined';
// const isFunction = (value) => typeof value === 'function';
const isNull = (value) => value === null;
const isNumber = (value) => typeof value === 'number' && isFinite(value);
const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;
const isRegex = (value) => value && typeof value === 'object' && value.constructor === RegExp;
const isString = (value) => typeof value === 'string' || value instanceof String;
// const isSymbol = (value) => typeof value === 'symbol';
const isUndefined = (value) => typeof value === 'undefined';

module.exports = {
	isArray,
	isBoolean,
	isBuffer,
	isDate,
	// isError,
	// isFunction,
	isNull,
	isNumber,
	isObject,
	isRegex,
	isString,
	// isSymbol,
	isUndefined,
};
