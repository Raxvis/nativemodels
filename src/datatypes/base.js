const base = {
	default(value) {
		this.hasDefault = true;
		this.defaultValue = value;

		return this;
	},
	nullable() {
		this.allowNull = true;

		return this;
	},
	parse(key, value) {
		return value;
	},
	required() {
		this.isRequired = true;

		return this;
	},
	requiredCheck(key, value) {
		if (value) {
			return true;
		}

		throw new Error(`Property: '${key}' is required`);
	},
	strict() {
		this.requireStrict = true;

		return this;
	},
	strictCheck() {
		return true;
	},
	validCheck() {
		return true;
	},
};

module.exports = base;
