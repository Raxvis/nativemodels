const parseValue = (schema, key, value) => {
	if (schema[key].allowNull && value === null) {
		return null;
	}

	return schema[key].parse(value, key);
};

module.exports = parseValue;
