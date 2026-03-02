import {serverConfiguration} from "../api/config";
import {deleteCard, deleteCardLike, likeCard} from "../api/api";

const previewDialog = document.getElementById("preview-dialog");

function likeButtonClick(event) {
    event.preventDefault();
    const cardElement = event.target.closest(".card")
    const cardId = cardElement.id;
    if (event.target.classList.contains("like__button_active")) {
        deleteCardLike(serverConfiguration, cardId)
            .then(res => {
                console.log('like card', res);
                cardElement.querySelector(".likes").textContent = res.likes.length;
            })
            .catch(err => {
                console.log('like card', err)
            });
    } else {
        likeCard(serverConfiguration, cardId)
            .then(res => {
                console.log('like card', res)
                cardElement.querySelector(".likes").textContent = res.likes.length;
            })
            .catch(err => {
                console.log('like card', err)
            });
    }
    event.target.classList.toggle("like__button_active");
}

function deleteButtonClick(event) {
    const elementToDelete = event.target.closest(".card");
    elementToDelete.remove();
    console.log(elementToDelete, elementToDelete.id)
    deleteCard(serverConfiguration, elementToDelete.id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
}

function handleCardClick(event, name, place) {
    if (event.target.type !== 'submit') {
        previewDialog.querySelector('#preview-image').src = place;
        previewDialog.querySelector('#preview-caption').textContent = name;
        previewDialog.showModal();
    }
}

function addPlace({name, link, likes, owner, _id}, isMine) {

    const cards = document.querySelector(".elements");
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const likeButton = cardElement.querySelector(".like__button");
    const deleteButton = cardElement.querySelector(".delete__button");
    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".likes").textContent = likes ? likes.length : 0;

    likeButton.addEventListener("click", likeButtonClick);

    if (isMine) {
        deleteButton.addEventListener("click", deleteButtonClick);
    } else {
        deleteButton.classList.add("visually-hidden");
    }

    cardElement.id = _id;

    cards.prepend(cardElement);
    cardElement.addEventListener('click', (event) => handleCardClick(event, name, link));
}

export {addPlace};