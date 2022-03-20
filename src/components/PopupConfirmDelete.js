import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor(popup, submitFormDelete) {
    super(popup);
    this._buttonDelete = document.querySelector(".form__button_delete");
    this._submitFormDelete = submitFormDelete;
  }

  handleConfirmDelete = (e, card, cardId) => {
    e.preventDefault();
    this._submitFormDelete(card, cardId);
    this.close();
  };

  setEventListeners() {
    super.open();
    this._buttonDelete.addEventListener("click", this.handleConfirmDelete);
  }
}