import {addPlace} from "./card";
import {
    clearValidation, setSubmitButtonState, checkInputValidity, isFormValid,
    clearInputs, validationConfig
} from "../validation";

const addDialog = document.getElementById("add-dialog");
const profileDialog = document.getElementById("profile-dialog");
const previewDialog = document.getElementById("preview-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
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

function handleAddPlaceSubmit(event) {
    event.preventDefault();
    addPlace(addPlaceForm.name.value, addPlaceForm.url.value);
    addDialog.close();
    addPlaceForm.reset();
    setSubmitButtonState(addSubmit, false);
}

function profileDialogShow(event) {
    clearInputs(profileForm, validationConfig);
    profileForm.name.value = profileName.textContent;
    profileForm.description.value = profileDescription.textContent;
    setSubmitButtonState(profileForm.querySelector(validationConfig.submitButtonSelector), true);
    profileDialog.showModal();
}

function addDialogShow(event) {
    clearValidation(addPlaceForm, validationConfig);
    addDialog.showModal();
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileForm.name.value;
    profileDescription.textContent = profileForm.description.value;
    profileDialog.close();
}

function setEventListeners(form, validationConfig) {
    const button = form.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    setSubmitButtonState(button, isFormValid(inputList));
    inputList.forEach(input => {
            input.addEventListener('input', (event) => {
                checkInputValidity(form, input);
                setSubmitButtonState(button, isFormValid(inputList));
            })
        }
    )
}

export {
    addDialogShow,
    handleProfileFormSubmit,
    profileDialogShow,
    handleAddPlaceSubmit,
    setSubmitButtonState,
    handleDialog,
    setEventListeners
}
