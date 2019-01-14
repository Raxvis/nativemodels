const {
	customtypes: { email, phone, url },
	datatypes: { array, boolean, computed, date, int, object, string },
} = require('./../../../src');

const photoSchema = {
	ext: string(),
	url: url().required(),
};

const contactSchema = {
	email: email(),
	phone: phone(),
	url: url().default('https://example.com'),
};

const userSchema = {
	accountID: int().nullable(),
	contact: object(contactSchema),
	created: date(),
	firstName: string().required(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	isAdmin: boolean().nullable(),
	lastName: string().required(),
	photos: array(object(photoSchema)),
	typeID: int().default(2),
};

module.exports = userSchema;
