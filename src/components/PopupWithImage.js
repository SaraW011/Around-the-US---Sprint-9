import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(link, name) {
    super.open();
    this._link = link;
    this._name = name;
    this._popup.querySelector(".modal__image-caption").textContent = this._name; //define in constructor

    //select the DOM element once and reuse it:
    const imagePreview = this._popup.querySelector(".modal__image-container"); //define in constructor
    imagePreview.src = this._link;
    imagePreview.alt = this._name;
  }
}