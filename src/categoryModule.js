import { createHeaderModule } from "/src/createHeader.js";
import { toDoListingModule } from "/src/createToDoListing.js";
import { domModule } from "/src/domModule.js";

let categoryModule = (function () {
	let categories = ["default"];
	let content = document.getElementById("content");

	function createCategory() {
		let categoryFormContainer = document.createElement("div");
		// categoryFormContainer.className = 'form'
		categoryFormContainer.setAttribute("id", "categoryformcontainer");
		content.appendChild(categoryFormContainer);

		let categoryForm = document.createElement("form");
		categoryForm.autocomplete = "off";
		categoryForm.setAttribute("id", "categoryform");
		categoryForm.className = "form";
		categoryFormContainer.appendChild(categoryForm);

		const formHeader = document.createElement("span");
		formHeader.className = "formheader";
		formHeader.innerHTML = "Create new project";
		categoryForm.appendChild(formHeader);

		let categoryLabel = document.createElement("label");
		categoryLabel.innerHTML = "Name";
		categoryForm.appendChild(categoryLabel);

		let newCategoryInput = document.createElement("input");
		newCategoryInput.setAttribute("id", "newcategory");
		newCategoryInput.placeholder = "enter project name";
		categoryForm.appendChild(newCategoryInput);

		let formButtonContainer = document.createElement("div");
		formButtonContainer.className = "formbuttoncontainer";
		categoryForm.appendChild(formButtonContainer);

		let cancelCategoryButton = document.createElement("button");
		cancelCategoryButton.setAttribute("id", "cancelcat");
		cancelCategoryButton.textContent = "Cancel";
		cancelCategoryButton.className = "formbutton";
		cancelCategoryButton.classList += " formcancelbutton";
		cancelCategoryButton.addEventListener("click", cancelCategory);
		formButtonContainer.appendChild(cancelCategoryButton);

		let newCategorySubmit = document.createElement("button");
		newCategorySubmit.setAttribute("id", "catsubmit");
		newCategorySubmit.textContent = "Submit";
		newCategorySubmit.className = "formbutton";
		newCategorySubmit.addEventListener("click", createNewCategory);
		formButtonContainer.appendChild(newCategorySubmit);

		content.removeChild(listcontainer);
	}

	function getLS() {
		for (let i = 0; i < localStorage.length; i++) {
			if (categories[i] != null) {
				continue;
			} else {
				let item = localStorage.getItem(`category${i}`);
				if (item == null) {
					continue;
				} else categories.push(item);
			}
		}
	}

	function createNewCategory() {
		let newCategory = document.getElementById("newcategory").value;
		if (newCategory == "") {
			alert("Category Name Must Have Value");
		} else {
			for (let i = 1; i <= categories.length; i++) {
				if (window.localStorage.getItem(`category${i}`) != null) {
					continue;
				} else localStorage.setItem(`category${i}`, newCategory);
			}
			getLS();
		}

		//     createFormModule.categories.push(newCategory)
		//
		//     //add local storage plug here
		//     for (let i = 0; i < catInLocal.length; i++ ) {
		//         // if (window.localStorage.getItem(`category${i}`) != null) {continue}
		//         if (`category${i}` in localStorage) {continue}
		//             // window.localStorage.setItem(`category${i+1}`, newCategory)
		//         else if (!(`category${i}` in localStorage)) {
		//             localStorage.setItem(`category${i}`, newCategory)
		//         }

		// }}

		content.removeChild(categoryformcontainer);
		content.removeChild(header);
		content.removeChild(categorymenu);
		// content.removeChild(catsubmit)
		// content.removeChild(cancelcat)

		createHeaderModule.createHeader();
		createHeaderModule.createCategoryMenu();
		toDoListingModule.createGenericList();
	}

	function cancelCategory() {
		content.removeChild(categoryformcontainer);
		content.removeChild(header);
		content.removeChild(categorymenu);

		createHeaderModule.createHeader();
		createHeaderModule.createCategoryMenu();
		toDoListingModule.createGenericList();
	}

	return {
		createCategory,
		createNewCategory,
		cancelCategory,
		getLS,
	};
})();

export { categoryModule };

window.categoryModule = categoryModule;
