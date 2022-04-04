//selectors imported into index.js intended for repetitive use:

// wrapper modals
export const editProfilePopup = document.querySelector(".modal_type_edit-profile");
export const addNewPlacePopup = document.querySelector(".modal_type_add-place");
export const previewImagePopup = document.querySelector(
  ".modal_type_preview-image"
);
export const editAvatarPopup = document.querySelector(".modal_type_edit-avatar");
export const deletePopup = document.querySelector(".modal_type_confirm-delete");


//user
export const userProfileName = document.querySelector(".profile__name");
export const userProfileTitle = document.querySelector(".profile__title");
export const userProfileAvatar = document.querySelector(".profile__avatar");


//forms
export const inputUrlForm = document.querySelector("#input_type_url");
export const inputPlaceNameForm = document.querySelector("#input_type_place");
export const inputAvatarPic = document.querySelector("#input_type_avatar-url");

// wrapper forms
export const placeForm = document.querySelector(".form-add-place");
export const profileForm = document.querySelector(".form-change-profile");
export const avatarForm = document.querySelector(".form-edit-avatar");
export const confirmDeleteForm = document.querySelector(".form-confirm-delete");

// input data fields in forms
export const inputName = document.querySelector(".form__input_type_name");
export const inputJob = document.querySelector(".form__input_type_job");

// buttons
export const saveProfileEditButton = document.querySelector(".form__button_type-edit-profile");
export const openProfileEditButton = document.querySelector(".profile__edit-button");
export const addNewPlacePopupButton = document.querySelector(".profile__add-button");
export const addNewPlaceSaveButton = document.querySelector(".form__button_type-add-card");

export const avatarImageSrc = document.querySelector(".profile__avatar");
export const openAvatarPopupButton = document.querySelector(".profile__avatar-edit-button");
export const confirmDeleteButton = document.querySelector(".form__button_delete");
export const saveAvatarButton = document.querySelector(".form__button_type-change-avatar");


// place - elements - template
export const templateSelector = document.querySelector(".elements-template").content;

//**-->> FORM VALIDATION SETTINGS <<--*/

// Assign form elements to variables:
export const formFieldset = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};