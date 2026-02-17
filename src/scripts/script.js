import "../fonts/fonts.css";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/variables.css";

import {defaultCards} from "./data";

const addDialog = document.getElementById("add-dialog");
const profileDialog = document.getElementById("profile-dialog");
const previewDialog = document.getElementById("preview-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
const profileSubmit = document.getElementById("profile-dialog__submit");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const addPlaceForm = document.forms.add;
const profileForm = document.forms.profile;
const cards = document.querySelector(".elements");
addPlaceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addPlace(addPlaceForm.name.value, addPlaceForm.url.value);
    addDialog.close();
    addPlaceForm.reset();
    setSubmitButtonState(addSubmit, false);
});

document.addEventListener("click", (e) => {
    if (e.target.id === "add-dialog") {
        addDialog.close();
    } else if (e.target.id === "profile-dialog") {
        profileDialog.close();
    }else if(e.target.id === "preview-dialog") {
        previewDialog.close();
    }
})

addPlaceForm.addEventListener("input", (e) => {
    const isFormValid = addPlaceForm.name.value.length > 0 && addPlaceForm.url.value.length > 0;
    setSubmitButtonState(addSubmit, isFormValid);
})


function setSubmitButtonState(button, isFormValid) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove('input__btn_disabled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('input__btn_disabled');
    }
}

function likeButtonClick(event) {
    event.preventDefault();
    event.target.classList.toggle("like__button_active");
}

function deleteButtonClick(event) {
    const elementToDelete = event.target.closest(".card");
    elementToDelete.remove();
}

function addPlace(name , place ) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const likeButton = cardElement.querySelector(".like__button");
    const deleteButton = cardElement.querySelector(".delete__button");
    cardElement.querySelector(".card__image").src = place;
    cardElement.querySelector(".card__title").textContent = name;

    likeButton.addEventListener("click", likeButtonClick);
    deleteButton.addEventListener("click", deleteButtonClick);

    cards.append(cardElement);
    cardElement.addEventListener('click', (event) => {
        previewDialog.querySelector('#preview-image').src = place;
        previewDialog.querySelector('#preview-caption').textContent = name;
        previewDialog.showModal();
    })
}

function init() {
    defaultCards.forEach(({name,place}) => addPlace(name, place));
}

editButton.addEventListener('click', (event) => {
    profileDialog.showModal();
    profileForm.name.value = profileName.textContent;
    profileForm.description.value = profileDescription.textContent;
});

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = profileForm.name.value;
    profileDescription.textContent = profileForm.description.value;
    profileDialog.close();
});


profileForm.addEventListener("input", (e) => {
    const isFormValid = profileForm.name.value.length > 0 && profileForm.description.value.length > 0;
    setSubmitButtonState(profileSubmit, isFormValid);
})

init();
