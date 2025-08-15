import { compareAsc, format } from "date-fns";
import { getAllProjects } from "../../localStorage/localStorage";
export class Project {
  constructor(title, description) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.createdDate = format(new Date(), "dd/MM/yyyy");
  }
}

export const renderAllProjectsToSideBar = function () {
  // get a list of projects, for each name, format it into the bar
  const allProjects = getAllProjects();
  const allProjectsSorted = allProjects.sort(compareAsc);
  const projectListElement = document.querySelector(".project-list");

  allProjectsSorted.forEach((Project) => {
    const projectId = Project.id;
    const projectName = Project.title;

    const listItemElement = document.createElement("li");
    listItemElement.textContent = projectName;
    listItemElement.dataset.id = projectId;

    projectListElement.append(listItemElement);
  });
};
