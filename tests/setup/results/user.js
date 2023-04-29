const userData = require('./../data/user');

const userResult = {
  ...userData,
  contact: {
    url: 'https://example.com',
    ...userData.contact,
    email: 'j.smith@example.com',
  },
  fullName: 'John Smith',
  isAdmin: null,
  photos: [{ ext: 'png', url: 'https://example.com/photo.png' }],
  typeID: 2,
};

module.exports = userResult;
