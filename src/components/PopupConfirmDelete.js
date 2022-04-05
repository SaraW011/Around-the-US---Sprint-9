import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  handleSubmitDelete(onSubmit) {
    this._btnDeleteCard = onSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._btnDeleteCard();
    });
  }
}
