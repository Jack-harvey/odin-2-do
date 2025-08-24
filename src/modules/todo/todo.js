import { format } from "date-fns";
import { getListOfToDos, getProjectDetails, read, update } from "../../localStorage/localStorage";
import { dateFormatter } from "../shared/common";
export class Todo {
  constructor(title, description, dueDate, projectId, isUrgent) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.projectId = projectId;
    this.createdDate = new Date().toISOString();
    this.completedDate = null;
    this.isUrgent = isUrgent;
  }
}

//create table, create a function for a single row, create a loop for each todo, add table to page

//send a request to the todo page to load todos, via an array of todos not a PID

export const attachTodoTable = function (projectId) {
  const mainEl = document.querySelector("#todoTable");
  const tableEl = createTableElement(projectId);
  mainEl.appendChild(tableEl);
};

const createTableElement = function (projectId) {
  const tableEl = document.createElement("table");
  tableEl.classList.add("todo-table");

  const todos = getListOfToDos(projectId);
  todos.forEach((todo) => {
    const tableRow = createTableRow(todo, getProjectDetails(projectId).title);
    tableEl.appendChild(tableRow);
  });

  return tableEl;
};

const createTableRow = function (todo, projectName) {
  const tableRow = document.createElement("tr");
  tableRow.dataset.id = todo.id;

  const tableDataName = document.createElement("td");
  tableDataName.textContent = todo.title;

  const tableDataProjectName = document.createElement("td");
  tableDataProjectName.textContent = projectName;

  const tableDataDueDate = document.createElement("td");
  tableDataDueDate.textContent = dateFormatter(todo.dueDate);

  const tableDataDeleteButton = document.createElement("i");
  tableDataDeleteButton.classList.add("fa-solid", "fa-trash", "delete-icon");

  const tableDataPriorityButton = document.createElement("i");
  tableDataPriorityButton.classList.add("fa-solid", "fa-flag", "priority-icon");

  const iscomplete = todo.completedDate;

  tableRow.append(
    checkMarkElement(iscomplete),
    tableDataName,
    tableDataProjectName,
    tableDataDueDate,
    tableDataPriorityButton,
    tableDataDeleteButton
  );

  tableRow.classList.add("todo-list-item");

  return tableRow;
};

const checkMarkElement = function (isComplete) {
  const tableDataCheckbox = document.createElement("i");
  tableDataCheckbox.classList.add("checkbox");
  tableDataCheckbox.classList.add("fa-regular");
  isComplete
    ? tableDataCheckbox.classList.add("fa-square-check")
    : tableDataCheckbox.classList.add("fa-square");
  return tableDataCheckbox;
};

export const toggleCheckMarkElement = function (targetElement) {
  const checkedBoxClass = "fa-square-check";
  const uncheckedBoxClass = "fa-square";
  const todoId = targetElement.parentElement.dataset.id;

  const record = read("todo", todoId);

  if (targetElement.classList.contains(checkedBoxClass)) {
    record.completedDate = null;
    update("todo", todoId, record);
    targetElement.classList.remove(checkedBoxClass);
    targetElement.classList.add(uncheckedBoxClass);
  } else {
    record.completedDate = new Date().toISOString();
    update("todo", todoId, record);
    targetElement.classList.remove(uncheckedBoxClass);
    targetElement.classList.add(checkedBoxClass);
  }
};
