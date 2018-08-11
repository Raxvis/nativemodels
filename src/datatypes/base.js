const base = {
	default(value) {
		this.hasDefault = true;
		this.defaultValue = value;

		return this;
	},
	parse(value) {
		return value;
	},
	required() {
		this.isRequired = true;

		return this;
	},
};

export default base;
