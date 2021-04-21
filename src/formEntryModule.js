import { createHeaderModule } from "./createHeader";
import { toDoListingModule } from "./createToDoListing";
import { toDoModule } from "/src/toDoModule.js";
import { Datepicker } from "vanillajs-datepicker";

let createFormModule = (function () {
  const content = document.getElementById("content");

  let categories = ["default"];

  window.localStorage.setItem("category0", "default");

  function createForm() {
    const formContainer = document.createElement("div");
    formContainer.setAttribute("id", "formcontainer");
    content.appendChild(formContainer);

    content.removeChild(listcontainer);

    const form = document.createElement("form");
    form.autocomplete = "off";
    form.setAttribute("id", "form");
    form.className = "form";
    formContainer.appendChild(form);

    const formHeader = document.createElement("span");
    formHeader.className = "formheader";
    formHeader.innerHTML = "Create a New Task";
    form.appendChild(formHeader);

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel);

    const title = document.createElement("input");
    title.setAttribute("id", "form-title");
    title.placeholder = "enter this task name";
    title.type = "text";
    title.name = "Name";
    form.appendChild(title);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date";
    form.appendChild(dueDateLabel);

    const dueDate = document.createElement("input");
    dueDate.setAttribute("id", "due-date");
    // dueDate.value = 'select a date'
    // dueDate.name = 'test'
    dueDate.type = "text";
    dueDate.placeholder = "select a due date for this task";

    const datepicker = new Datepicker(dueDate, {
      // container: true,
      // showOnClick: true,
      autohide: true,
    });

    form.appendChild(dueDate);

    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Category";
    form.appendChild(categoryLabel);

    let category = document.createElement("select");
    category.setAttribute("id", "form-category");
    category.placeholder = "select project category";
    form.appendChild(category);

    // for(let i = 0; i < categories.length; i++ ) {
    //     let option = document.createElement('option')
    //         option.textContent = categories[i]
    //         category.appendChild(option)

    for (let i = 0; i < window.localStorage.length; i++) {
      if (localStorage.getItem(`category${i}`) == null) {
        continue;
      }
      let option = document.createElement("option");
      option.textContent = localStorage.getItem(`category${i}`);
      category.appendChild(option);
    }

    // const statusLabel = document.createElement('label')
    //     statusLabel.textContent = 'Status'
    //     form.appendChild(statusLabel)

    // const status = document.createElement('input')
    //     status.setAttribute('id', 'form-status')
    //     // status.value = true
    //     status.type = 'checkbox'
    //     status.name = 'status'
    //     form.appendChild(status)

    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes";
    form.appendChild(notesLabel);

    const notes = document.createElement("input");
    notes.setAttribute("id", "form-notes");
    notes.className = "notes-form";
    notes.placeholder = "enter notes about this task";
    notes.type = "text";
    notes.name = "name";
    form.appendChild(notes);

    let formButtonContainer = document.createElement("div");
    // formButtonContainer.setAttribute('id', 'formbuttoncontainer')
    formButtonContainer.className = "formbuttoncontainer";
    form.appendChild(formButtonContainer);

    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel");
    cancelButton.className = "formbutton";
    cancelButton.classList += " formcancelbutton";
    formButtonContainer.appendChild(cancelButton);
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", cancelSubmission);

    let submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.className = "formbutton";
    formButtonContainer.appendChild(submitButton);
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", toDoModule.createNewToDo);
  }

  function cancelSubmission() {
    // content.removeChild(form)
    // content.removeChild(submit)
    // content.removeChild(cancel)
    content.removeChild(header);
    content.removeChild(categorymenu);
    content.removeChild(formcontainer);

    createHeaderModule.createHeader();
    createHeaderModule.createCategoryMenu();
    toDoListingModule.createGenericList();
  }

  return { createForm, categories };
})();

export { createFormModule };
