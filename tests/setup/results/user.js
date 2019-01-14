const userData = require('./../data/user');

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

module.exports = userResult;
