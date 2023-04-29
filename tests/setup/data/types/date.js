module.exports = {
  invalid: ['string', false],
  invalidStrict: [100.0, '2018-10-01 00:00:00'],
  strict: [new Date()],
  valid: [new Date(), 100.0, '2018-10-01 00:00:00'],
};
