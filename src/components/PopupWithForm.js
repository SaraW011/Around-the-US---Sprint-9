import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputFieldValues = {};
    this._inputList = [...this._form.querySelectorAll(".form__input")];
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._inputFieldValues[input.name] = input.value;
    });
   return this._inputFieldValues;
  }

  handleFormSubmit = (e) => {
    // e.preventDefault(); // no longer affecting anything 
    const newCardInput = this._handleFormSubmit(this._getInputValues());
    return newCardInput;
  };

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", this.handleFormSubmit);
  } 

  close() {
    super.close();
    this._form.reset();
  }
}