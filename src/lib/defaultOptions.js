const defaultOptions = {
	// Allow Nulls on all columns
	allowNulls: false,
	// Ignores case when initializing object from model
	caseSensitive: true,
	// Throws an error if key is not in schema
	strict: false,
	// Strip undefined values passed in
	stripUndefined: true,
};

module.exports = defaultOptions;
