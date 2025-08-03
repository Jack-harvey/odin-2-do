import "./styles.css";
import { checkIfLocalStorageDataExists } from "./localStorage/localStorage";
import { attachTodoTable } from "./modules/todo/todo";

checkIfLocalStorageDataExists();

const TESTINGID = "2ec42c7e-9224-4853-95d5-d850985ddbcd";

attachTodoTable(TESTINGID);
