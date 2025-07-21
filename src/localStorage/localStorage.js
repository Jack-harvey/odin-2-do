import { Project } from "../features/projects/scripts/project";
import { todo } from "../features/toDos/scripts/todo";

export function create(storeName) {
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
    create(storeName);
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
  const store = getStore("todos");
  let associatedTodos = store.filter((item) => item.projectId === projectId);
  console.log(associatedTodos);
  return associatedTodos;
};

export const checkIfLocalStorageDataExists = function () {
  if (!JSON.parse(localStorage.getItem("projects")) && !JSON.parse(localStorage.getItem("todos"))) {
    console.log("no data exists");
    createFirstTimeData();
    return;
  }
  console.log("data exists");
  return;
};

const createFirstTimeData = function () {
  create("projects");
  const initialProject = new Project(
    "Clean the house",
    "The house needs to be cleaned every day",
    "Do the dishes before bed because it makes you happy.",
    "#0bd6a7"
  );
  add("projects", initialProject);

  create("todos");
  const toDoForTest0 = todo(
    "Wash the dishes",
    false,
    "Wash the dishes using soap and water at the sink",
    "Don't forget the cup on your desk",
    "1/12/25",
    initialProject.id
  );
  const toDoForTest1 = todo(
    "put away all the  things",
    false,
    "Tidy up",
    "everything has a home, if it doesn't then make one",
    "1/1/93",
    initialProject.id
  );
  const toDoForTest2 = todo(
    "fold the washing",
    true,
    "Fold it like Marie Kondo!",
    "It can't live on the couch FOREVER",
    "30/5/25",
    initialProject.id
  );
  const toDoForTest3 = todo("Clean out the fridge", false, "", "", "30/5/25", initialProject.id);
  add("todos", toDoForTest0);
  add("todos", toDoForTest1);
  add("todos", toDoForTest2);
  add("todos", toDoForTest3);
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
  return getStore("projects");
};

export const getProjectDetails = function (projectId) {
  const projects = getStore("projects");
  const project = projects.filter((project) => project.id === projectId);
  return project[0];
};
