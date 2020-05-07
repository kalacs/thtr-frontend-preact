export const truncate = function (str, length, ending) {
  if (length == null) {
    length = 150;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

export const scrollRow = (domNode) => {
  if (domNode) domNode.scrollIntoView({ behavior: "smooth", block: "start" });
};
export const scrollColumn = (domNode) => {
  if (domNode) domNode.scrollIntoView({ behavior: "smooth", inline: "start" });
};

export const getDomNode = (row, column) =>
  document.querySelector(
    `div[data-focus-row='${row}'] div[data-focus-column='${column}']`
  );

export const removeSelectedClass = (row) => {
  document
    .querySelectorAll(`div[data-focus-row='${row}'] div[data-focus-column]`)
    .forEach((domNode) => {
      const classes = domNode.classList;
      const [, lastClass] = classes.values();
      console.log("LASTCALSS", [...classes.values()]);
      domNode.classList.remove(lastClass);
    });
};
