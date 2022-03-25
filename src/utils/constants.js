//selectors imported into index.js intended for repetitive use:

// wrapper modals
export const editProfilePopup = document.querySelector(".modal_type_edit-profile");
export const addNewPlacePopup = document.querySelector(".modal_type_add-place");
export const previewImagePopup = document.querySelector(
  ".modal_type_preview-image"
);
export const editAvatarPopup = document.querySelector(".modal_type_edit-avatar");
export const inputUrlForm = document.querySelector("#input_type_url");
export const inputPlaceNameForm = document.querySelector("#input_type_place");

// wrapper forms
export const placeForm = document.querySelector(".form-add-place");
export const profileForm = document.querySelector(".form-change-profile");
export const avatarForm = document.querySelector(".form-edit-avatar");
export const confirmDeleteForm = document.querySelector(".form-confirm-delete");

// input data fields in forms
export const inputName = document.querySelector(".form__input_type_name");
export const inputJob = document.querySelector(".form__input_type_job");

// buttons
export const saveProfileEditButton = document.querySelector("#edit-profile_save-button");
export const openProfileEditButton = document.querySelector(".profile__edit-button");
export const addNewPlacePopupButton = document.querySelector(".profile__add-button");
export const addNewPlaceSaveButton = document.querySelector("#add-card_save-button");

export const openAvatarPopupButton = document.querySelector(".profile__avatar-edit-button");
export const confirmDeleteButton = document.querySelector(".form__button_delete");
export const saveAvatarButton = document.querySelector("#modal__avatar-save-button");


// place - elements - template
export const templateSelector = (".elements-template");

//**-->> FORM VALIDATION SETTINGS <<--*/

// Assign form elements to variables:
export const formFieldset = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};