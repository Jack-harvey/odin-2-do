import { format } from "date-fns";
export class Todo {
  constructor(title, description, dueDate, projectId, isUrgent) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.projectId = projectId;
    this.createdDate = format(new Date(), "dd/MM/yyyy");
    this.completedDate = null;
    this.isUrgent = isUrgent;
  }
}

//create table, create a function for a single row, create a loop for each todo, add table to page

const createTableElement = function () {
  const tableEl = document.createElement("table");
  tableEl.classList.add("todo-table");
  tableEl.innerHTML = `
          <tr class="table-header">
            <th></th>
            <th>Todo</th>
            <th>Notes</th>
            <th>Due-Date</th>
          </tr>
  `;

  return tableEl;
};

const createTableRow = function (todo) {
  const tableRow = document.createElement("tr");
  tableRow.dataset.id = todo.id;
};
