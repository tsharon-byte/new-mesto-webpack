import "../fonts/fonts.css";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/variables.css";

import {defaultCards} from "./data";
import {addPlace} from "./components/card";
import {
    addDialogShow,
    handleAddPlaceSubmit, handleDialog,
    handleProfileFormSubmit,
    profileDialogShow,
    profileFormValidate, setEventListeners, validateAddPlaceForm
} from "./components/modal";

const openAddDialogButton=document.querySelector("#open-add-dialog");
const profileForm = document.forms.profile;
const editButton = document.querySelector(".profile__edit-button");
const addPlaceForm = document.forms.add;

function init() {
    defaultCards.forEach(({name, place}) => addPlace(name, place));
}
openAddDialogButton.addEventListener('click',addDialogShow);
editButton.addEventListener('click', profileDialogShow);

//profileForm.addEventListener("input", profileFormValidate);
setEventListeners(profileForm);
profileForm.addEventListener("submit", handleProfileFormSubmit);

addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);
//addPlaceForm.addEventListener("input", validateAddPlaceForm);
setEventListeners(addPlaceForm);

document.addEventListener("click", handleDialog);

init();
