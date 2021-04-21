import { toDoModule } from "./toDoModule";

let toDoListingModule = (function () {
  let content = document.getElementById("content");


  function closeNotes(item, notesItem, seeNotesButton) {
    item.classList.remove("todoexpnaded");
    item.className = "todoitem";
    item.removeChild(notesItem);
    item.appendChild(seeNotesButton);
    item.removeChild(closenotesbutton);
  }

  function seeNotes(item, notesItem, seeNotesButton) {
    item.removeChild(seeNotesButton);
    let closeNotesButton = document.createElement("button");
    closeNotesButton.setAttribute("id", "closenotesbutton");
    closeNotesButton.innerHTML = "Hide Notes";
    closeNotesButton.addEventListener("click", (e) => {
      closeNotes(item, notesItem, seeNotesButton);
    });
    item.appendChild(closeNotesButton);
    item.appendChild(notesItem);
  }

  function deleteToDo(index) {
    content.removeChild(listcontainer);
    window.localStorage.removeItem(index);
    toDoModule.emptyToDoList();
    toDoModule.getLocalStorage();
    createGenericList();
  }

  function createGenericList() {
    let listContainer = document.createElement("div");
    listContainer.setAttribute("id", "listcontainer");
    content.appendChild(listContainer);

    // for (let i = 0; i < toDoModule.toDoList.length; i++) {
    for (let i = 0; i <= window.localStorage.length + 100; i++) {
      if (window.localStorage.getItem(i) == null) {
        continue;
      }

      let toDoParsed = JSON.parse(localStorage.getItem(i));

      let toDoItem = document.createElement("div");
      toDoItem.className = "todoitem";
      toDoItem.setAttribute("id", `item${i}`);

      let titleContainer = document.createElement("div");
      titleContainer.className = "titlecontainer";

      let title = document.createElement("div");

      title.textContent = toDoParsed["title"];
      if (toDoParsed["status"]) {
        title.className = "todotitlecomplete";
      } else title.className = "todotitle";

      titleContainer.appendChild(title);
      toDoItem.appendChild(titleContainer);

      let date = document.createElement("div");
      date.textContent = toDoParsed["date"];
      date.className = "todosubhead";
      toDoItem.appendChild(date);

      let category = document.createElement("div");
      category.textContent = toDoParsed["category"];
      category.className = "todosubhead";
      toDoItem.appendChild(category);

      //deals with notes, creates them, shows them on the item and hides them again
      let notes = document.createElement("div");
      notes.innerHTML = toDoParsed["notes"];
      notes.setAttribute("id", "note");
      notes.className = "notes";


      let seeNotesButton = document.createElement("button");
      seeNotesButton.setAttribute("id", "seenotesbutton");
      seeNotesButton.innerHTML = "Show Notes";
      seeNotesButton.addEventListener("click", (e) => {
        seeNotes(toDoItem, notes, seeNotesButton);
      });
      toDoItem.appendChild(seeNotesButton);
      //end notes

      let todoActionContainer = document.createElement("div");

      let markCompleteButton = document.createElement("button");
      markCompleteButton.className = "markcompletebutton";
      markCompleteButton.innerHTML = "Mark Complete";
      markCompleteButton.addEventListener("click", (e) => {
        if (toDoParsed["status"] == false) {
          toDoParsed["status"] = true;
          markCompleteButton.innerHTML = "Not Complete";
          title.className = "todotitlecomplete";
        } else {
          toDoParsed["status"] = false;
          markCompleteButton.innerHTML = "Mark Complete";
          title.className = "todotitle";
        }
      });
      todoActionContainer.appendChild(markCompleteButton);

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "delete";
      deleteButton.className = "deletebutton";
      deleteButton.addEventListener("click", (e) => {
        deleteToDo(i);
      });
      todoActionContainer.appendChild(deleteButton);
      titleContainer.appendChild(todoActionContainer);

      listContainer.appendChild(toDoItem);
    }
  }

  //
  function createList(category) {
    let listContainer = document.createElement("div");
    listContainer.setAttribute("id", "listcontainer");
    content.appendChild(listContainer);

    // for (let i = 0; i < toDoModule.toDoList.length; i++) {
    for (let i = 0; i < window.localStorage.length; i++) {
      if (window.localStorage.getItem(i) == null) {
        continue;
      }

      let toDoParsed = JSON.parse(localStorage.getItem(i));

      if (toDoParsed["category"] == category) {
        let toDoItem = document.createElement("div");
        toDoItem.className = "todoitem";
        toDoItem.setAttribute("id", `item${i}`);

        let titleContainer = document.createElement("div");
        titleContainer.className = "titlecontainer";
        toDoItem.appendChild(titleContainer);

        let title = document.createElement("div");
        // title.textContent = toDoModule.toDoList[i]['title']
        title.textContent = toDoParsed["title"];
        if (toDoParsed["status"]) {
          title.className = "todotitlecomplete";
        } else title.className = "todotitle";
        titleContainer.appendChild(title);

        let date = document.createElement("div");
        // date.textContent = toDoModule.toDoList[i]['date']
        date.textContent = toDoParsed["date"];
        date.className = "todosubhead";
        toDoItem.appendChild(date);

        let category = document.createElement("div");
        category.textContent = toDoParsed["category"];
        category.className = "todosubhead";
        toDoItem.appendChild(category);

        let notes = document.createElement("div");
        notes.innerHTML = toDoParsed["notes"];
        notes.setAttribute("id", "note");
        notes.className = "notes";

        let seeNotesButton = document.createElement("button");
        seeNotesButton.setAttribute("id", "seenotesbutton");
        seeNotesButton.innerHTML = "Show Notes";
        seeNotesButton.addEventListener("click", (e) => {
          seeNotes(toDoItem, notes, seeNotesButton);
        });
        toDoItem.appendChild(seeNotesButton);

        let todoActionContainer = document.createElement("div");

        let markCompleteButton = document.createElement("button");
        markCompleteButton.className = "markcompletebutton";
        markCompleteButton.innerHTML = "Mark Complete";
        markCompleteButton.addEventListener("click", (e) => {
          if (toDoParsed["status"] == false) {
            toDoParsed["status"] = true;
            markCompleteButton.innerHTML = "Not Complete";
            title.className = "todotitlecomplete";
          } else {
            toDoParsed["status"] = false;
            markCompleteButton.innerHTML = "Mark Complete";
            title.className = "todotitle";
          }
        });
        todoActionContainer.appendChild(markCompleteButton);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.className = "deletebutton";
        deleteButton.addEventListener("click", (e) => {
          deleteToDo(i);
        });
        todoActionContainer.appendChild(deleteButton);
        titleContainer.appendChild(todoActionContainer);

        listContainer.appendChild(toDoItem);
      }
    }
    // content.removeChild(listContainer)
  }

  return { createList, createGenericList };
})();

export { toDoListingModule };
