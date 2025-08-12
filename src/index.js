import "./styles.css";
import {
  checkIfLocalStorageDataExists,
  getAllTodosWithinDayTimeFrame,
} from "./localStorage/localStorage";
import { attachTodoTable } from "./modules/todo/todo";

checkIfLocalStorageDataExists();

const TESTINGID = "6e93c45c-42a7-492e-8fd7-c5f9db0df0b3";

attachTodoTable(TESTINGID);

console.log(getAllTodosWithinDayTimeFrame(3));
