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
    profileForm.name.value = profileName.textContent;
    profileForm.description.value = profileDescription.textContent;
    const button = profileForm.querySelector('.submit');
    const inputList = Array.from(profileForm.querySelectorAll('.input'));
    setSubmitButtonState(button, true);
    inputList.forEach(input => {
            checkInputValidity(profileForm, input);
        }
    )
    profileDialog.showModal();
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

function isFormValid(inputList) {
    return !inputList.some(item => !item.validity.valid);
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function setEventListeners(form) {
    const button = form.querySelector('.submit');
    const inputList = Array.from(form.querySelectorAll('.input'));
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
    profileFormValidate,
    handleProfileFormSubmit,
    profileDialogShow,
    validateAddPlaceForm,
    handleAddPlaceSubmit,
    setSubmitButtonState,
    handleDialog,
    setEventListeners
}
