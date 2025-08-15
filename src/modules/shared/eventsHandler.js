// on page load, check if there's data. If not we create it.
// next we need to display the projects in the list, and add the events to those items.
// when that's clicked we need to load the todos on the page, and add all the events to that
// as well.

import { attachTodoTable } from "../todo/todo";
import { clearTodoTable } from "./common";

export const addAsideEventhandler = function () {
  const asideEl = document.querySelector("aside");
  asideEl.addEventListener("click", (e) => {
    const targetClassList = e.target.classList;

    if (targetClassList.contains("project-list-item")) {
      clearTodoTable();
      attachTodoTable(e.target.dataset.id);
    }
  });
};
