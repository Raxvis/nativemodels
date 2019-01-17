const overrides = {
	name: 'base',
	parse: (key, value) => value,
	requiredCheck: (key, value) => {
		if (value) {
			return true;
		}

		throw new Error(`Property: '${key}' is required`);
	},
	strictCheck: () => true,
	validCheck: () => true,
};

const chainable = {
	default(value) {
		this.hasDefault = true;
		this.defaultValue = value;

		return this;
	},
	nullable() {
		this.allowNull = true;

		return this;
	},
	required() {
		this.isRequired = true;

		return this;
	},
	strict() {
		this.requireStrict = true;

		return this;
	},
	transform(fn) {
		this.transformFn = fn;

		return this;
	},
};

const base = () => ({
	...overrides,
	...chainable,
});

module.exports = base;
