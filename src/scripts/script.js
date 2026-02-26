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
} from "./components/modal";
import {enableValidation} from "./validation";

const openAddDialogButton = document.querySelector("#open-add-dialog");
const profileForm = document.forms.profile;
const editButton = document.querySelector(".profile__edit-button");
const addPlaceForm = document.forms.add;

function init() {
    defaultCards.forEach(({name, place}) => addPlace(name, place));
}

openAddDialogButton.addEventListener('click', addDialogShow);
editButton.addEventListener('click', profileDialogShow);
profileForm.addEventListener("submit", handleProfileFormSubmit);
addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);
document.addEventListener("click", handleDialog);

init();
enableValidation();
