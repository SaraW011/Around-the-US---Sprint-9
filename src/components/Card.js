export default class Card {
  constructor(
    cardData, imagePreview, cardLike, cardDislike, confirmDelete,
    templateSelector, //main template
    userData
  ) {
    //info
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._myLike = false;

    // actions - listeners
    this._imagePreview = imagePreview;
    this._cardLike = cardLike;
    this._cardDislike = cardDislike;
    this._confirmDelete = confirmDelete;

  
    this._likes = cardData.likes;
    this._likesNum = cardData.likes.length;

    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._myId = userData._userId;

    //=================================== SELECTORS
    this._cardElement = templateSelector
      .querySelector(".elements__element")
      .cloneNode(true); //<li>

    this._cardName = this._cardElement.querySelector(".elements__text");
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._btnDelete = this._cardElement.querySelector(".elements__trash");
    this._btnLike = this._cardElement.querySelector(".elements__heart");
    this._likeNum = this._cardElement.querySelector(
      ".elements__number-of-likes"
    );
  }

  //=================================== METHODS

  // _getCardTemplate() {
  //   this._cardElement = this._cardTemplate
  //   .querySelector(".elements__element")   //<li>
  //   .cloneNode(true);
  //   return this._cardElement;
  // }

  //method like project 9:
  _likeCount() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._btnLike.classList.add(".elements__heart_active");
      }
    });
  }

  _confirmDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //only owner can remove card
  _ownerDeleteCard() {
    if (this._ownerId === this._myId) {
      this._btnDelete.remove(".elements__trash_disabled"); //enables
    }
  }

  //================================================ LISTENERS

  _setEventListeners() {
    // card likes

    this._btnLike.addEventListener("click", (event) => {
      if (!this._myLike) {
        this._cardLike(event, this._cardId, this._likeNum);
        this._myLike = true;
      } else {
        this._cardDislike(event, this._cardId, this._likeNum);
        this._myLike = false;
      }
    });

    //delete card
    this._btnDelete.addEventListener("click", () => {
      this._confirmDeleteCard();
    });

    //preview image
    this._cardImage.addEventListener("click", () => {
      this._imagePreview(this._link, this._name);
    });
  }

  //====================================================
  renderCardElement() {
    // this._cardElement = this._getCardTemplate;

    this._cardName.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._btnLike.textContent = this._likesNum;
    this._likeCount();
    this._ownerDeleteCard();
    this._setEventListeners();

    return this._cardElement;
  }
}