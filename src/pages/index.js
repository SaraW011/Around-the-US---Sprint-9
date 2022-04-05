import "regenerator-runtime/runtime";
import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  userProfileName,
  userProfileTitle,
  userProfileAvatar,
  editProfilePopup,
  addNewPlacePopup,
  previewImagePopup,
  editAvatarPopup,
  deletePopup,
  placeForm,
  profileForm,
  avatarForm,
  inputName,
  inputJob,
  inputUrlForm,
  inputAvatarPic,
  inputPlaceNameForm,
  openProfileEditButton,
  saveProfileEditButton,
  addNewPlacePopupButton,
  addNewPlaceSaveButton,
  openAvatarPopupButton,
  confirmDeleteButton,
  saveAvatarButton,
  templateSelector,
  formFieldset,
} from "../utils/constants.js";
import { async } from "regenerator-runtime/runtime";

//**-->> API <<--*/
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "b211c19a-1dd2-41b6-b48a-d98d5e63db67",
});

//======================== fetch **USER ID** from server using Api
//name, about, avatar, id:

async function fetchData() {
  try {
    const userId = await api.getData();
    if (userId) {
      userInfo.setUserInfo({
        name: userId.name,
        about: userId.about,
      });
      userInfo.setUserAvatar(userId.avatar);
      loadInitialCards(userId._id);
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  }
}

window.onload = () => {
  fetchData();
};

// ======================== fetch CARDS from server using Api

async function loadInitialCards() {
  try {
    const cards = await api.getInitialCards();
    if (cards) {
      cardContainer.renderCards(cards);
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  }
}
//================================================= MY INFO

const userInfo = new UserInfo(
  userProfileName,
  userProfileTitle,
  userProfileAvatar
);
//=========================================== RENDER CARD SECTION

// new card
function createCard(cardData) {
  const card = new Card(
    cardData,
    previewPlaceCard,
    likePlaceCard,
    dislikePlaceCard,
    handleDeleteCard,
    templateSelector,
    userInfo
  );
  return card.renderCardElement();
}

const cardContainer = new Section(
  { renderer: createCard },
  ".elements__list" //ul
);

// const cardContainer = new Section(
//   {
//     renderer: (element) => {
//       const newCard = createCard(element);
//       cardContainer.addItem(newCard);
//     },
//   },
//   ".elements"
// );

//**-->> CARD FUNCTIONS <<----------------------------------*/

// like card
async function likePlaceCard(card) {
  try {
    const addLike = await api.likeCard(card);
    if (addLike) {
      return addLike.likes;
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  }
}

// dislike card

async function dislikePlaceCard(card) {
  try {
    const dislikeCard = await api.dislikeCard(card);
    if (dislikeCard) {
      return dislikeCard.likes;
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  }
}

// **-->> FORMS <<---------------------------------------------------------------*/
// Project 9: all forms submitted are now linked to api and have promise chains:

//delete place-card
const confirmDeletionPopup = new PopupConfirmDelete(
  deletePopup,
  confirmDeleteButton,
  handleDeleteCard
);
confirmDeletionPopup.setEventListeners();

function handleDeleteCard(cardImage, cardId) {
  confirmDeletionPopup.open();
  confirmDeletionPopup.handleSubmitDelete(async () => {
  confirmDeleteButton.textContent = "Deleting...";
    try {
      const deleteCard = await api.deleteCard(cardId);
      if (deleteCard) {
        cardImage.remove();
        cardImage = null;
        confirmDeletionPopup.close();
      }
    } catch (err) {
      console.log(err, err.status, err.statusText, err.stack);
      alert(err);
    }
    finally {
      confirmDeleteButton.textContent = "Yes";
    }
  });
}

// add new place-card form:
const addPlacePopup = new PopupWithForm(addNewPlacePopup, submitNewPlaceForm);
addPlacePopup.setEventListeners();

async function submitNewPlaceForm() {
  addNewPlaceSaveButton.textContent = "Saving...";
  try {
    const newPlaceCard = await api.addPlaceCard(
      inputPlaceNameForm.value,
      inputUrlForm.value
    );
    const newCardElement = createCard(newPlaceCard);
    cardContainer.addItem(newCardElement);
    addPlacePopup.close();
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  } finally {
    addNewPlaceSaveButton.textContent = "Create";
  }
}

//edit avatar form -----------------------------------------------
const changeAvatarForm = new PopupWithForm(editAvatarPopup, editAvatarForm);
changeAvatarForm.setEventListeners();

async function editAvatarForm() {
  try {
    saveAvatarButton.textContent = "saving...";
    const saveNewAvatar = await api.editAvatar(inputAvatarPic.value);
    if (saveNewAvatar) {
      userInfo.setUserAvatar(saveNewAvatar.avatar);
      changeAvatarForm.close();
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  } finally {
    saveAvatarButton.textContent = "Save";
  }
}

// update user profile-info form:
const profileModal = new PopupWithForm(editProfilePopup, submitProfileForm);
profileModal.setEventListeners();

async function submitProfileForm() {
  saveProfileEditButton.textContent = "Saving...";
  try {
    const userValues = await api.editUserInfo(inputName.value, inputJob.value); //html inputs
    if (userValues) {
      userInfo.setUserInfo({
        name: userValues.name,
        about: userValues.about,
        id: userValues._id,
      });
      profileModal.close();
    }
  } catch (err) {
    console.log(err, err.status, err.statusText, err.stack);
    alert(err);
  } finally {
    saveProfileEditButton.textContent = "Save";
  }
}

//---->>>>>>  holds initial values inside profile form when open:
function currentProfileName() {
  //-----get data from UserInfo class:
  const inputData = userInfo.getUserInfo();
  inputName.value = inputData.name;
  inputJob.value = inputData.about;
  //call @ eventListener
}
//<<<<<<----
//preview image:
const previewImage = new PopupWithImage(previewImagePopup);
previewImage.setEventListeners();

function previewPlaceCard(link, text) {
  previewImage.open(link, text);
}

//**-->> ENABLE FORM VALIDATION <<--*/

const placeFormValidator = new FormValidator(formFieldset, placeForm);
placeFormValidator.enableValidation();

const profileFormValidator = new FormValidator(formFieldset, profileForm);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formFieldset, avatarForm);
avatarFormValidator.enableValidation();

// **-->> EVENT LISTENERS <<--*/

openProfileEditButton.addEventListener("click", () => {
  profileModal.open();
  currentProfileName();
});

addNewPlacePopupButton.addEventListener("click", () => {
  addPlacePopup.open();
  placeFormValidator.disableSubmitButton();
});

openAvatarPopupButton.addEventListener("click", () => {
  changeAvatarForm.open();
  avatarFormValidator.disableSubmitButton();
});
