const strictCheck = (type, key, value) => {
	if (type.requireStrict && type.strictCheck) {
		type.strictCheck(key, value);
	}
};

module.exports = strictCheck;
