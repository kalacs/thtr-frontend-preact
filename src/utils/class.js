export const stripTemplate = (parts) => parts;
export const combineArray = (base, other) =>
  base.map((item, index) => `${item}${other[index] || ""}`).join("");
export const createClass = (condition, templateParts, params) =>
  condition ? combineArray(templateParts, params) : "";
