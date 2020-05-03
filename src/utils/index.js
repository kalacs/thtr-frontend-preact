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

export const scrollToRow = (domNode) => {
  if (domNode && domNode.current)
    domNode.current.scrollIntoView({ behavior: "smooth", block: "start" });
};
export const scrollToCell = (domNode) => {
  if (domNode && domNode.current)
    domNode.current.scrollIntoView({ behavior: "smooth", inline: "start" });
};
