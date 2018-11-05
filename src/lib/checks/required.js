const requiredCheck = (type, key, value) => {
	if (type.isRequired) {
		type.requiredCheck(key, value);
	}
};

module.exports = requiredCheck;
