import "./styles.css";
import {
  checkIfLocalStorageDataExists,
  getAllTodosWithinDayTimeFrame,
} from "./localStorage/localStorage";
import { attachTodoTable } from "./modules/todo/todo";

checkIfLocalStorageDataExists();

const TESTINGID = "481447ca-d37e-4546-94c9-0953b6831b8d";

attachTodoTable(TESTINGID);

console.log(getAllTodosWithinDayTimeFrame(3));
