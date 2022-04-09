import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._button = this._form.querySelector(".form__button");
    this._inputFieldValues = {};
    this._inputList = [...this._form.querySelectorAll(".form__input")];

    // this._submitBtnText = this._submitBtn.textContent
  }

  // // improve with default text
  // renderLoading(isLoading, loadingText='Saving...') {
  //   if (isLoading) {
  //     this._submitBtnText.textContent = loadingText;
  //   } else {
  //     this._submitBtnText.textContent = this._submitBtnText;
  //   }
  // }

  getInputValues() {
    this._inputList.forEach((input) => {
      this._inputFieldValues[input.name] = input.value;
    });
    return this._inputFieldValues;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const newCardInput = this._handleFormSubmit(this.getInputValues());
    return newCardInput;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}