import { createFormModule } from "./formEntryModule";
import { toDoListingModule } from "./createToDoListing";
import { categoryModule } from "/src/categoryModule.js";
import { domModule } from "/src/domModule.js";

let createHeaderModule = (function () {
  let content = document.getElementById("content");

  function createHeader() {
    //CREATES HEADER
    let header = document.createElement("div");
    header.setAttribute("id", "header");

    let leftMenu = document.createElement("div");
    leftMenu.setAttribute("id", "left-menu");
    header.appendChild(leftMenu);

    let title = document.createElement("h1");
    title.textContent = "Project Task List";
    title.className = "title";
    leftMenu.appendChild(title);

    let rightMenu = document.createElement("div");
    rightMenu.setAttribute("id", "right-menu");
    header.appendChild(rightMenu);

    let addCategory = document.createElement("button");
    addCategory.className = "headerbutton";
    addCategory.classList.add("addprojectbutton");
    addCategory.setAttribute("id", "addprojectbutton");
    addCategory.textContent = "New Project";
    rightMenu.appendChild(addCategory);
    addCategory.addEventListener("click", (e) => {
      categoryModule.createCategory();
      document.getElementById("addtodobutton").disabled = true;
      document.getElementById("addprojectbutton").disabled = true;
      document.getElementsByClassName(
        "activated-menucategorybutton"
      )[0].disabled = true;
      let inactiveProjectButtons = document.getElementsByClassName(
        "menucategorybutton"
      );
      for (let i = 0; i < inactiveProjectButtons.length; i++) {
        inactiveProjectButtons[i].disabled = true;
      }
    });
    ///////////
    let addToDo = document.createElement("button");
    addToDo.className = "headerbutton";
    addToDo.classList.add("addtodobutton");
    addToDo.setAttribute("id", "addtodobutton");
    addToDo.textContent = "New Task";
    addToDo.addEventListener("click", (e) => {
      createFormModule.createForm();
      document.getElementById("addtodobutton").disabled = true;
      document.getElementById("addprojectbutton").disabled = true;
      document.getElementsByClassName(
        "activated-menucategorybutton"
      )[0].disabled = true;
      let inactiveProjectButtons = document.getElementsByClassName(
        "menucategorybutton"
      );
      for (let i = 0; i < inactiveProjectButtons.length; i++) {
        inactiveProjectButtons[i].disabled = true;
      }
    });
    rightMenu.appendChild(addToDo);

    content.appendChild(header);
  }

  function createCategoryMenu() {
    let categoryMenu = document.createElement("div");
    categoryMenu.setAttribute("id", "categorymenu");

    let projectsText = document.createElement("p");
    projectsText.className = "category-header";
    projectsText.textContent = "Projects:   ";
    categoryMenu.appendChild(projectsText);

    let allCategories = document.createElement("button");
    let listContainer = document.getElementById("listcontainer");

    allCategories.className = "activated-menucategorybutton";
    allCategories.textContent = "ALL";
    allCategories.addEventListener("click", (e) => {
      allCategories.className = "activated-menucategorybutton";
      content.removeChild(listcontainer);
      toDoListingModule.createGenericList();
      let allCategoryButtons = categoryMenu.getElementsByTagName("button");
      for (let i = 1; i < allCategoryButtons.length; i++) {
        allCategoryButtons[i].className = "menucategorybutton";
      }
    });
    categoryMenu.appendChild(allCategories);
    content.appendChild(categoryMenu);

    // for (let i = 1; i < createFormModule.categories.length; i++) {
    for (let i = 1; i < window.localStorage.length; i++) {
      if (window.localStorage.getItem(`category${i}`) == null) {
        continue;
      }

      let category = document.createElement("button");
      let categoryParsed = window.localStorage.getItem(`category${i}`);
      //
      category.className = "menucategorybutton";
      category.setAttribute("id", i);
      // category.textContent = createFormModule.categories[i].toUpperCase();
      category.textContent = categoryParsed.toUpperCase();

      category.addEventListener("click", (e) => {
        allCategories.className = "menucategorybutton";
        category.className = "activated-menucategorybutton";

        let allButtons = categoryMenu.querySelectorAll("button");
        for (let j = 1; j < allButtons.length; j++) {
          if (allButtons[j].getAttribute("id") == i) {
            continue;
          }
          allButtons[j].className = "menucategorybutton";
        }

        content.removeChild(header);
        content.removeChild(categorymenu);

        content.removeChild(listcontainer);

        createHeader();
        content.appendChild(categoryMenu);
        toDoListingModule.createList(categoryParsed);
      });

      categoryMenu.appendChild(category);
    }
  }

  return { createHeader, createCategoryMenu };
})();

export { createHeaderModule };
