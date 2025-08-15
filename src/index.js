import "./styles.css";
import {
  checkIfLocalStorageDataExists,
  getAllTodosWithinDayTimeFrame,
} from "./localStorage/localStorage";
import { attachTodoTable } from "./modules/todo/todo";
import { renderAllProjectsToSideBar } from "./modules/project/project";
import { addAsideEventhandler } from "./modules/shared/eventsHandler";

checkIfLocalStorageDataExists();

renderAllProjectsToSideBar();

addAsideEventhandler();

console.log(getAllTodosWithinDayTimeFrame(3));
