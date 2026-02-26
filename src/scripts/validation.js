import {setEventListeners} from "./components/modal";

const ERROR_MESSAGE = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'input__btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error'
}

function setSubmitButtonState(button, isFormValid) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove(validationConfig.inactiveButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(validationConfig.inactiveButtonClass);
    }
}

function clearValidation(form, config) {
    form.reset();
    clearInputs(form, config);
    setSubmitButtonState(form.querySelector(config.submitButtonSelector), false);
}

function clearInputs(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach(item => hideInputError(form, item));
}


const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};


const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
        inputElement.setCustomValidity(inputElement.dataset.errorMessage || ERROR_MESSAGE);
    } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};


function isFormValid(inputList) {
    return !inputList.some(item => !item.validity.valid);
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(form => setEventListeners(form, validationConfig));
}

export {clearValidation, setSubmitButtonState, checkInputValidity, isFormValid, enableValidation, clearInputs, validationConfig}