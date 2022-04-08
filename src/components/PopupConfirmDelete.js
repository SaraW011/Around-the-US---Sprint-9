import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  handleSubmitDelete(newHandler) {
    this._handleSubmit = newHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
