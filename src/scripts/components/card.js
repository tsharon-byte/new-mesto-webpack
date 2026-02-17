const previewDialog = document.getElementById("preview-dialog");

function likeButtonClick(event) {
    event.preventDefault();
    event.target.classList.toggle("like__button_active");
}

function deleteButtonClick(event) {
    const elementToDelete = event.target.closest(".card");
    elementToDelete.remove();
}

function handleCardClick(event, name, place) {
    if (event.target.type !== 'submit')
    {
        previewDialog.querySelector('#preview-image').src = place;
        previewDialog.querySelector('#preview-caption').textContent = name;
        previewDialog.showModal();
    }
}

function addPlace(name, place) {

    const cards = document.querySelector(".elements");
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const likeButton = cardElement.querySelector(".like__button");
    const deleteButton = cardElement.querySelector(".delete__button");
    cardElement.querySelector(".card__image").src = place;
    cardElement.querySelector(".card__title").textContent = name;

    likeButton.addEventListener("click", likeButtonClick);
    deleteButton.addEventListener("click", deleteButtonClick);

    cards.append(cardElement);
    cardElement.addEventListener('click', (event) => handleCardClick(event, name, place));
}

export {addPlace};