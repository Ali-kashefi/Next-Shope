// Include viewable fields from object
export function includeObj(obj, includesKey) {
 
  const newObj = {};
  Object.keys(obj)
    .filter((key) => includesKey.includes(key)) 
    .forEach((key) => (newObj[key] = obj[key])); 
  return newObj;
}

