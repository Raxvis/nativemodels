const recaseKeys = (schema, record) => {
  const keyMap = Object.keys(schema).reduce(
    (result, key) => ({
      ...result,
      [key.toLowerCase()]: key,
    }),
    {},
  );

  return Object.keys(record).reduce(
    (result, key) => ({
      ...result,
      [keyMap[key.toLowerCase()] || key]: record[key],
    }),
    {},
  );
};

module.exports = recaseKeys;
