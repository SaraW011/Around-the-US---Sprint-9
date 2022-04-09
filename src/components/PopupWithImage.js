import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageCaption = this._popup.querySelector(".modal__image-caption")
    this._imageContainer = this._popup.querySelector(".modal__image-container");
  }

  open(link, name) {
    this._link = link;
    this._name = name;
    this._imageCaption.textContent = this._name;

    this._imageContainer.src = this._link;
    this._imageContainer.alt = this._name;

        super.open();
  }
}