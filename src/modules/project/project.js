import { format } from "date-fns";
export class Project {
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.createdDate = format(new Date(), "dd/MM/yyyy");
  }
}
