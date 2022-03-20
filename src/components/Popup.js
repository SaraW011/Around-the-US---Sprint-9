export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
  }

  _handleEscClose = (event) => {
    const key = event.key;
    if (key == "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (event) => {
    if (
      event.target.classList.contains("modal_open") ||
      event.target.classList.contains(`modal__image-wrapper`)
    ) {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this._popup.querySelector(".modal__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}