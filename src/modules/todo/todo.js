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
