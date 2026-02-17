import "../fonts/fonts.css";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/variables.css";

import {defaultCards} from "./data";

const addDialog = document.getElementById("add-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
const addPlaceForm = document.forms.add;
const cards = document.querySelector(".elements");
addPlaceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addPlace(addPlaceForm.name.value, addPlaceForm.url.value);
    addDialog.close();
    addPlaceForm.reset();
    setSubmitButtonState(false);
});

addPlaceForm.addEventListener("input", (e) => {
    const isFormValid = addPlaceForm.name.value.length > 0 && addPlaceForm.url.value.length > 0;
    setSubmitButtonState(isFormValid);
})


function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        addSubmit.removeAttribute('disabled');
        addSubmit.classList.remove('input__btn_disabled');
    } else {
        addSubmit.setAttribute('disabled', true);
        addSubmit.classList.add('input__btn_disabled');
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

function addPlace(name = "Карачаевск", place = "images/Karachaevsk.jpg") {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const likeButton = cardElement.querySelector(".like__button");
    const deleteButton = cardElement.querySelector(".delete__button");
    cardElement.querySelector(".card__image").src = place;
    cardElement.querySelector(".card__title").textContent = name;

    likeButton.addEventListener("click", likeButtonClick);
    deleteButton.addEventListener("click", deleteButtonClick);

    cards.append(cardElement);
}

function init() {
    defaultCards.forEach((card) => addPlace(card.name, card.place));
}

init();
