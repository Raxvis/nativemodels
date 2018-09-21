const base = {
	default(value) {
		this.hasDefault = true;
		this.defaultValue = value;

		return this;
	},
	nullable() {
		this.allowNull = true;
	},
	parse(value) {
		return value;
	},
	required() {
		this.isRequired = true;

		return this;
	},
};

module.exports = base;
