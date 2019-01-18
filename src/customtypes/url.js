const regex = require('./regex');

const url = () => regex(/^(https?|ftp):\/\/(-\.)?([^\s/?.#]+\.?)+(\/[^\s]*)?$/iu, 'url');

module.exports = url;
