import "../fonts/fonts.css";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/variables.css";


import image from "../images/Karachaevsk.jpg";

const defaultCards = [
    {
        name: "Карачаевск",
        place: image,
    },
    {
        name: "Гора Эльбрус",
        place: image,
    },
    {
        name: "Домбай",
        place: image,
    },
];

const addDialog = document.getElementById("add-dialog");
const addSubmit = document.getElementById("add-dialog__submit");
const placeName = document.getElementById("place-name");
const placeUrl = document.getElementById("place-url");
const cards = document.querySelector(".elements");
addSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    addPlace(placeName.value, placeUrl.value);
    addDialog.close();
});

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
