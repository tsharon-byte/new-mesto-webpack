import {addPlace} from "./card";
import {
    clearValidation, setSubmitButtonState, checkInputValidity, isFormValid, clearInputs, validationConfig
} from "../validation";
import {addCard, updateAvatar, updateMe} from "../api/api";
import {serverConfiguration} from "../api/config";

const addDialog = document.getElementById("add-dialog");
const profileDialog = document.getElementById("profile-dialog");
const previewDialog = document.getElementById("preview-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const addPlaceForm = document.forms.add;
const avatarForm = document.forms.avatar;
const avatarSubmit = avatarForm.querySelector('button[type="submit"]');
const avatarDialog = document.getElementById("avatar-dialog");
const profileForm = document.forms.profile;

const photo = document.querySelector("#profile__photo");

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
    const name = addPlaceForm.name.value;
    const link = addPlaceForm.url.value;
    addCard(serverConfiguration, {name, link})
        .then(res => {
            addPlace(res, true);
        })
        .catch(err => console.log(err));
    addDialog.close();
    addPlaceForm.reset();
    setSubmitButtonState(addSubmit, false);
}

function handleAvatarSubmit(event) {
    event.preventDefault();
    updateAvatar(serverConfiguration, {
        avatar: avatarForm.avatar.value
    }).then(res => {
        console.log(res.avatar);
        photo.src = res.avatar;
    })
        .catch(err => {
            console.log(err)
        });
    avatarDialog.close();
    avatarForm.reset();
    setSubmitButtonState(avatarSubmit, false);
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

function avatarDialogShow(event) {
    clearValidation(avatarForm, validationConfig);
    avatarDialog.showModal();
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileForm.name.value;
    profileDescription.textContent = profileForm.description.value;

    updateMe(serverConfiguration, {
        name: profileForm.name.value, about: profileForm.description.value
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    });
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
    })
}

export {
    addDialogShow,
    handleProfileFormSubmit,
    profileDialogShow,
    handleAddPlaceSubmit,
    setSubmitButtonState,
    handleDialog,
    setEventListeners,
    avatarDialogShow,
    handleAvatarSubmit
}
