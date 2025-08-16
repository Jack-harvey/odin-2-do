import { format } from "date-fns";

export const clearTodoTable = function () {
  clearContent("#todoTable");
};

const clearContent = function (querySelector) {
  const content = document.querySelector(querySelector);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};

export const dateFormatter = function (date) {
  return format(date, "dd/MM/yy");
};
