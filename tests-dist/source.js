const nativemodels = __dirname.indexOf('tests-dist') > -1 ? require('./../dist') : require('./../src');

module.exports = nativemodels;
