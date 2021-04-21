import { toDoModule } from '/src/toDoModule.js';
import { toDoListingModule } from '/src/createToDoListing.js';
import { createHeaderModule } from '/src/createHeader.js';
import { categoryModule } from '/src/categoryModule.js';
// import { Datepicker } from '/node_modules/vanillajs-datepicker/js/Datepicker.js';



// temporary for debugging, its allowing me to see the items from this modules in the console
// window.toDoModule = toDoModule
// window.createFormModule = createFormModule
// window.toDoListingModule = toDoListingModule
// window.createHeaderModule = createHeaderModule


createHeaderModule.createHeader();
createHeaderModule.createCategoryMenu();
toDoModule.getLocalStorage();
toDoListingModule.createGenericList();
categoryModule.getLS();
























