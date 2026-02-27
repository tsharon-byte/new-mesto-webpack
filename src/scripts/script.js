import "../fonts/fonts.css";
import "../styles/globals.css";
import "../styles/style.css";
import "../styles/variables.css";
import {addPlace} from "./components/card";
import {
    addDialogShow,
    handleAddPlaceSubmit, handleDialog,
    handleProfileFormSubmit,
    profileDialogShow,
} from "./components/modal";
import {enableValidation} from "./validation";
import {getCards, getMe, updateMe, addCard} from "./api/api";
import {serverConfiguration} from "./api/config";

const openAddDialogButton = document.querySelector("#open-add-dialog");
const profileForm = document.forms.profile;
const editButton = document.querySelector(".profile__edit-button");
const addPlaceForm = document.forms.add;
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const photo=document.querySelector("#profile__photo");

function init() {
    Promise.all([getMe(serverConfiguration), getCards(serverConfiguration)])
        .then(res => {
            const {name, about, avatar} = res[0];
            profileName.textContent = name;
            profileDescription.textContent = about;
            photo.src=avatar;
            const cards = res[1];
            console.log('cards', cards);
            cards.forEach(({name, link}) => addPlace(name, link));
        })
        .catch(err => {
            console.log('err', err);
        })
}

openAddDialogButton.addEventListener('click', addDialogShow);
editButton.addEventListener('click', profileDialogShow);
profileForm.addEventListener("submit", handleProfileFormSubmit);
addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);
document.addEventListener("click", handleDialog);

init();
enableValidation();
