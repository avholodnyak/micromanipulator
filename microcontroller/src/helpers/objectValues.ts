const objectValues = <T>(obj: Record<any, T>): T[] => {
  const values = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const k in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(k)) values.push(obj[k]);
  }
  return values;
};

export default objectValues;
