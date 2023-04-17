module.exports = (value, type, fns) => {
  value.default && type.default(value.default);
  value.nullable && type.nullable();
  value.required && type.required();
  value.strict && type.strict();
  value.transform && type.transform(fns[value.transform]);

  return type;
};
