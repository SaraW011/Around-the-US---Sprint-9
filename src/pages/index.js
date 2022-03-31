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
  editProfilePopup,
  addNewPlacePopup,
  previewImagePopup,
  editAvatarPopup,
  confirmDeleteForm,
  placeForm,
  profileForm,
  avatarForm,
  inputName,
  inputJob,
  inputUrlForm,
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

//**-->> API <<--*/
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "b211c19a-1dd2-41b6-b48a-d98d5e63db67"
});


//======================== load **USER ID** from server using Api 
//name, about, avatar, id: 

async function fetchData() {
    const user = await api
    .getData()
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name, 
        about: user.about, 
        id: user._id});
      userInfo.setUserAvatar(user.avatar);
      loadInitialCards();
    })
    .catch((err) => {
      console.log(err, err.status, err.statusText);
      alert(err);
    });
}

window.onload = () => {
  fetchData();
};

// ======================== load CARDS from server using Api 

async function loadInitialCards() {
  await api
    .getInitialCards()
    .then((cards) => {
      cardContainer.renderCards(cards);
    })
    .catch((err) => {
      console.log(err, err.status, err.statusText);
      alert(err);
    });
}
//================================================= MY INFO

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  ".profile__avatar"
);
//=========================================== RENDER CARD SECTION


// new card
function createCard(cardData) {
  const card = new Card(
    cardData,
    //ul conatins li
    handleImagePreview,
    likePlaceCard,
    dislikePlaceCard,
    confirmDeletePlaceCard,
    templateSelector,
    userInfo
  );
  return card.renderCardElement();
}

const cardContainer = new Section(
  {renderer: createCard},
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

function handleImagePreview(link, name) {
  previewImage.open(link, name);
}

//delete place-card
const confirmDeletionPopup = new PopupConfirmDelete(
  confirmDeleteForm,
  confirmDeleteButton,
  confirmDeletePlaceCard
);

function confirmDeletePlaceCard(place, cardId) {
  confirmDeletionPopup.open();
  api
    .deleteCard(cardId)
    .then(() => {
      place.remove();
      place = null;
      confirmDeletionPopup.close();
    })
    .catch((err) => {
      console.log(err.status, err.statusText);
    });
}

// like card
function likePlaceCard(cardId) {
  api.likeCard(cardId)
  .then((LikeAdded) => {
    console.log('card was liked', LikeAdded.likes);
    })
  .catch((err) => {
    console.log(err);
  }); 
}

//dislike card
function dislikePlaceCard(cardId) {
  api.dislikeCard(cardId)
  .then((likeRemoved) => {
    console.log('card was disliked', likeRemoved.likes);
    })
  .catch((err) => {
    console.log(err);
  }); 
}

// **-->> FORMS <<---------------------------------------------------------------*/
// Project 9: all forms submitted are now linked to api and have promise chains:

//edit avatar form -----------------------------------------------
const editAvatar = new PopupWithForm(editAvatarPopup, editAvatarForm);
editAvatar.setEventListeners();

function editAvatarForm(event) {
  event.preventDefault();
  saveAvatarButton.textContent = "saving...";
  api
    .editAvatar(inputUrlForm.value)
    .then((user) => {
      // might need to put into object brackets
      userInfo.setUserAvatar(user.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err.status, err.statusText);
    })
    .finally(() => {
      saveAvatarButton.textContent = "Save";
    });
}

// add new place-card form --------------------------------------
const addPlacePopup = new PopupWithForm(addNewPlacePopup, submitNewPlaceForm);
addPlacePopup.setEventListeners();

function submitNewPlaceForm() {
  addNewPlaceSaveButton.textContent = "Saving...";
  api.getData()
    .then(data => {
    api.addPlaceCard(inputPlaceNameForm.value, inputUrlForm.value) // might need to spesify url for each form?????
      .then(
        (card => {
          cardContainer.renderCards(card, data._id);
          addPlacePopup.close();
        })
          .catch((err) => {
            console.log(err.status, err.statusText);
          })
          .finally(() => {
            addNewPlaceSaveButton.textContent = "Create";
          })
      );
    })
}

// update user profile-info form:
const profileModal = new PopupWithForm(editProfilePopup, submitProfileForm);
profileModal.setEventListeners();

function submitProfileForm(event, inputs) {
  event.preventDefault();
  saveProfileEditButton.textContent = "Saving...";
  api
    .editUserInfo(inputs.name, inputs.about) //html inputs
    .then((user) => {
      userInfo.setUserInfo({name: user.name, about: user.about, id:user._id});
      profileModal.close();
    })
    .catch((err) => {
      console.log(err.status, err.statusText);
    })
    .finally(() => {
      saveProfileEditButton.textContent = "Save";
    });
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
  editAvatar.open();
  avatarFormValidator.disableSubmitButton();
});
