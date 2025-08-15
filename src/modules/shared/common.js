export const clearTodoTable = function () {
  clearContent("#todoTable");
};

const clearContent = function (querySelector) {
  const content = document.querySelector(querySelector);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};
