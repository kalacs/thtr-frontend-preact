import styles from "../components/collection/tile/item/style.scss";

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
export const scrollColumn = (row, direction) => {
  const domNode = document.querySelector(
    `div[data-focus-row='${row}'] > div > div`
  );

  if (domNode) {
    domNode.scrollBy({
      behavior: "smooth",
      left: 1880 * direction,
    });
  }
};
export const getDomNode = (row, column) =>
  document.querySelector(
    `div[data-focus-row='${row}'] div[data-focus-column='${column}']`
  );

export const removeSelectedClass = (row) => {
  document
    .querySelectorAll(`div[data-focus-row='${row}'] div[data-focus-column]`)
    .forEach((domNode) => {
      const classList = domNode.classList;
      const classes = Array.from(classList.values());

      if (classes.length > 1) {
        domNode.classList.remove(classes.pop());
      }
    });
};

export const addSelectedClass = (row, column) => {
  const node = document.querySelector(
    `div[data-focus-row='${row}'] div[data-focus-column='${column}']`
  );

  if (node) {
    node.classList.add(styles.selected);
  }

  return true;
};

export const noop = () => {};
export const toJson = (response) => response.json();
