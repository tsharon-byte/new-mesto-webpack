import {addPlace} from "./card";

const addDialog = document.getElementById("add-dialog");
const profileDialog = document.getElementById("profile-dialog");
const previewDialog = document.getElementById("preview-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
const profileSubmit = document.getElementById("profile-dialog__submit");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const addPlaceForm = document.forms.add;
const profileForm = document.forms.profile;

function handleDialog(e) {
    if (e.target.id === "add-dialog") {
        addDialog.close();
    } else if (e.target.id === "profile-dialog") {
        profileDialog.close();
    } else if (e.target.id === "preview-dialog") {
        previewDialog.close();
    }
}

function setSubmitButtonState(button, isFormValid) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove('input__btn_disabled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('input__btn_disabled');
    }
}

function handleAddPlaceSubmit(event) {
    event.preventDefault();
    addPlace(addPlaceForm.name.value, addPlaceForm.url.value);
    addDialog.close();
    addPlaceForm.reset();
    setSubmitButtonState(addSubmit, false);
}

function validateAddPlaceForm(e) {
    const isFormValid = addPlaceForm.name.value.length > 0 && addPlaceForm.url.value.length > 0;
    setSubmitButtonState(addSubmit, isFormValid);
}

function profileDialogShow(event) {
    profileDialog.showModal();
    profileForm.name.value = profileName.textContent;
    profileForm.description.value = profileDescription.textContent;
}

function addDialogShow(event) {
    addDialog.showModal();
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileForm.name.value;
    profileDescription.textContent = profileForm.description.value;
    profileDialog.close();
}

function profileFormValidate(e) {
    const isFormValid = profileForm.name.value.length > 0 && profileForm.description.value.length > 0;
    setSubmitButtonState(profileSubmit, isFormValid);
}
export {addDialogShow, profileFormValidate,handleProfileFormSubmit, profileDialogShow, validateAddPlaceForm, handleAddPlaceSubmit, setSubmitButtonState, handleDialog}
