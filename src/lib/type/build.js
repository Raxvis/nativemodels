module.exports = (value, types, fns) => {
  if (value.type === 'computed') {
    return types[value.type](fns[value.fn]);
  } else if (value.type === 'object') {
    return types[value.type](require('./../../generateSchema')(value.schema, types, fns));
  } else if (value.type === 'array') {
    return types[value.type](require('./generate')(value.item, types, fns));
  }

  return types[value.type]();
};
