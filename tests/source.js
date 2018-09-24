const nativemodels = __dirname.indexOf('test-dist') > -1 ? require('./../dist') : require('./../src');

module.exports = nativemodels;
