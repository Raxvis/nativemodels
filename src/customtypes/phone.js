const regex = require('./regex');

const phone = () => regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/iu, 'phone');

module.exports = phone;
