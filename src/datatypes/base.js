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
	parse(value) {
		return value;
	},
	required() {
		this.isRequired = true;

		return this;
	},
	strict() {
		this.requireStrict = true;

		return this;
	},
	strictCheck() {
		return true;
	},
	validate() {
		return true;
	},
};

module.exports = base;
