import { createHeaderModule } from "/src/createHeader.js";
import { toDoListingModule } from "/src/createToDoListing.js";

let toDoModule = (function () {
  let toDoList = [];
  let test = [];
  window.toDoList = toDoList;
  window.test = test;

  let toDoFactory = (title, date, category, status, notes) => {
    return { title, date, category, status, notes };
  };

  function emptyToDoList() {
    toDoList.length = 0;
  }

  function getLocalStorage() {
    for (let i = -1; i <= window.localStorage.length + 100; i++) {
      if (toDoList[i] != null) {
        continue;
      } else {
        let item = window.localStorage.getItem(i);
        if (item == null) {
          continue;
        } else toDoList.push(JSON.parse(item));
      }
    }
  }

  window.getLocalStorage = getLocalStorage;

  let createNewToDo = () => {
    let title = document.getElementById("form-title").value;
    let date = document.getElementById("due-date").value;
    let category = document.getElementById("form-category").value;
    let status = false;
    let notes = document.getElementById("form-notes").value;
    let toDo = toDoFactory(title, date, category, status, notes);

    let toDoSerialized = JSON.stringify(toDo);

    for (let i = 0; i <= toDoList.length; i++) {
      if (window.localStorage.getItem(i) != null) {
        continue;
      } else window.localStorage.setItem(i, toDoSerialized);
      break;
    }
    emptyToDoList();
    getLocalStorage();

    content.removeChild(formcontainer);
    content.removeChild(header);
    content.removeChild(categorymenu);

    createHeaderModule.createHeader();
    createHeaderModule.createCategoryMenu();
    toDoListingModule.createGenericList();
  };

  return {
    toDoList,
    toDoFactory,
    createNewToDo,
    getLocalStorage,
    emptyToDoList,
  };
})();

export { toDoModule };
