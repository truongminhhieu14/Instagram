export const removeEmpty = (obj: any) => {
  if (!obj) return obj;
  const notNullOrUndefinedProp = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] != null && obj[key] !== "") {
      acc = {
        ...acc,
        [key]: typeof obj[key] === "string" ? obj[key].trim() : obj[key],
      };
    }
    return acc;
  }, {});
  return notNullOrUndefinedProp;
};
