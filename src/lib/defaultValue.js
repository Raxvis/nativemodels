const defaultValue = (value) => (typeof value === 'function' ? value() : value);

module.exports = defaultValue;
