const {
	datatypes: { array, boolean, computed, date, int, object, string },
} = require('./source');

const photoSchema = {
	ext: string(),
	url: string().required(),
};

const contactSchema = {
	email: string(),
	phone: string(),
	url: string().default('https://example.com'),
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

const userData = {
	contact: {
		email: 'j.smith@example.com',
	},
	firstName: 'John',
	isAdmin: null,
	lastName: 'Smith',
};
const userResult = {
	...userData,
	contact: {
		url: 'https://example.com',
		...userData.contact,
	},
	fullName: 'John Smith',
	isAdmin: null,
	typeID: 2,
};

module.exports = {
	userData,
	userResult,
	userSchema,
};
