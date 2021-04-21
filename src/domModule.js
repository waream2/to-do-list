let domModule = (function () {
    const listContainer = document.getElementById('listcontainer');
    const header = document.getElementById('header');
    const categoryMenu = document.getElementById('categorymenu');
    const formContainer = document.getElementById('formcontainer');
    const content = document.getElementById('content');
    const closeNotesButton = document.getElementById('closenotesbutton');
    const categoryFormContainer = document.getElementById('categoryformcontainer');

    return {listContainer, header,categoryMenu, formContainer, content, closeNotesButton, categoryFormContainer};
})();



export { domModule };