import { Todo } from "../modules/todo/todo";
import { Project } from "../modules/project/project";
import { format, addDays, isBefore } from "date-fns";

export function createStore(storeName) {
  localStorage.setItem(storeName, JSON.stringify([]));
}

export function add(storeName, object) {
  const store = getStore(storeName);
  store.push(object);
  saveToLocalStorage(storeName, store);
}

export function read(storeName, id) {
  const record = getRecord(storeName, id);
  console.log("ls read");
  console.log(record);
  return record[0];
}

export function update(storeName, id, newRecord) {
  const store = getStore(storeName);
  const index = getIndex(storeName, id);
  const spread = { ...newRecord };
  spread.id = store[index].id;

  console.log(`old values`);
  console.log(store[index]);
  store[index] = spread;
  console.log(`new values`);
  console.log(store[index]);

  saveToLocalStorage(storeName, store);
}

export function remove(storeName, id) {
  const store = getStore(storeName);
  const index = getIndex(storeName, id);

  store.splice(index, 1);
  console.log("removed entry");

  saveToLocalStorage(storeName, store);
}

const getRecord = function (storeName, id) {
  const store = getStore(storeName);
  let record = store.filter((item) => item.id === id);
  return record;
};

const getStore = function (storeName) {
  let store = JSON.parse(localStorage.getItem(storeName));

  if (!store) {
    createStore(storeName);
    store = JSON.parse(localStorage.getItem(storeName));
  }

  return store;
};

const getIndex = function (storeName, id) {
  const store = getStore(storeName);
  const index = store.findIndex(function (item, i) {
    return item.id === id;
  });

  return index;
};

const saveToLocalStorage = function (storeName, store) {
  localStorage.setItem(storeName, JSON.stringify(store));
  console.log("saved to local storage");
};

export const getListOfToDos = function (projectId) {
  const store = getStore("todo");
  let associatedTodos = store.filter((item) => item.projectId === projectId);
  return associatedTodos;
};

const getListOfAllUncompletedTodos = function () {
  const store = getStore("todo");
  let associatedTodos = store.filter((item) => item.completedDate === null);
  return associatedTodos;
};

const getListOfTodosMatchingDateFromFilteredArray = function (filteredArray, date) {
  let associatedTodos = filteredArray.filter(
    (item) => format(item.dueDate, "dd/MM/yyyy") === format(date, "dd/MM/yyyy")
  );
  return associatedTodos;
};

export const checkIfLocalStorageDataExists = function () {
  if (!JSON.parse(localStorage.getItem("project")) && !JSON.parse(localStorage.getItem("todo"))) {
    console.log("no data exists");
    createFirstTimeData();
    return;
  }
  console.log("data exists");
  return;
};

const createFirstTimeData = function () {
  createStore("project");
  const firstTimeProject = new Project("Clean the house", "Pretend visitors are on their way!");
  add("project", firstTimeProject);

  createStore("todo");
  const firstTimeTodoOne = new Todo(
    "Dishes",
    "Wash the dishes to completion",
    new Date(2077, 1, 5).toISOString(),
    firstTimeProject.id,
    0
  );
  const firstTimeTodoTwo = new Todo(
    "FISHES",
    "Wash the FISHES to completion",
    addDays(new Date().toISOString(), 2),
    firstTimeProject.id,
    1
  );

  add("todo", firstTimeTodoOne);
  add("todo", firstTimeTodoTwo);
};

export const getCountOfAllTodosOnProject = function (projectId) {
  const countOfTodosOnProject = getListOfToDos(projectId).length;
  return countOfTodosOnProject;
};

export const getCountOfAllCompletedTodosOnProject = function (projectId) {
  const todosOnProject = getListOfToDos(projectId);
  const completedTodos = todosOnProject.filter((item) => item.completed === true);
  return completedTodos.length;
};

export const getAllProjects = function () {
  return getStore("project");
};

export const getProjectDetails = function (projectId) {
  const projects = getStore("project");
  const project = projects.filter((project) => project.id === projectId);
  return project[0];
};

export const getAllTodosWithinDayTimeFrame = function (timeFrameInDays) {
  const allUncompletedTodos = getListOfAllUncompletedTodos();
  const TODAY = new Date().toISOString();
  const dateToFilter = addDays(TODAY, timeFrameInDays);
  const result = allUncompletedTodos.filter((todo) => isBefore(todo.dueDate, dateToFilter));

  return result;
};
