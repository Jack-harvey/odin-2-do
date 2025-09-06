import "./styles.css";
import {
  checkIfLocalStorageDataExists,
  getAllTodosWithinDayTimeFrame,
} from "./localStorage/localStorage";
import { attachTodoTable } from "./modules/todo/todo";
import { renderAllProjectsToSideBar } from "./modules/project/project";
import { addAsideEventhandler, addNewTodoInputEventHandler } from "./modules/shared/eventsHandler";

checkIfLocalStorageDataExists();

renderAllProjectsToSideBar();

addAsideEventhandler();
addNewTodoInputEventHandler();

console.log(getAllTodosWithinDayTimeFrame(3));
