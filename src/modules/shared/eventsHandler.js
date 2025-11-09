// on page load, check if there's data. If not we create it.
// next we need to display the projects in the list, and add the events to those items.
// when that's clicked we need to load the todos on the page, and add all the events to that
// as well.

import { renderProjectInfoForTodos } from "../project/project";
import { attachTodoTable, toggleCheckMarkElement, toggleUrgency } from "../todo/todo";
import { clearTodoTable } from "./common";

export const addAsideEventhandler = function () {
  const asideEl = document.querySelector("aside");
  asideEl.addEventListener("click", (e) => {
    const targetClassList = e.target.classList;

    if (targetClassList.contains("project-list-item")) {
      const projectId = e.target.dataset.id;
      clearTodoTable();
      renderProjectInfoForTodos(projectId);
      attachTodoTable(projectId);
      addTodoListItemEventHandler();
    }
  });
};

const addTodoListItemEventHandler = function () {
  const todoTableEl = document.querySelector(".todo-table");
  todoTableEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
      console.log("checkbox");
      toggleCheckMarkElement(e.target);
    }
    if (e.target.classList.contains("delete-icon")) {
      console.log("delte");
    }
    if (e.target.classList.contains("priority-icon")) {
      console.log("pri");
      toggleUrgency(e.target);
    }
  });
};

export const addNewTodoInputEventHandler = function () {
  const inputElement = document.querySelector("#newTodoInput");

  inputElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("calendar")) {
      console.log("cal :)");
      e.currentTarget.showPicker();
    }
    if (e.target.classList.contains("flag")) {
      console.log("flag :)");
      e.target.classList.toggle("red");
    }
  });

  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed :)");

      const textData = "";
      const dateData = "";
      const flagIsSet = false;
    }
  });
};

const inputSubmit = function () {};
