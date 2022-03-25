export default class Card {
  constructor(
    cardData,
    templateSelector,

    imagePreview,
    cardLike,
    cardDislike,
    confirmDelete,
    userId
  ) {
    //info
    this._likesArray = cardData.likes;
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._templateSelector = templateSelector; //card template

    //actions - listeners
    this._imagePreview = imagePreview;
    this._cardLike = cardLike;
    this._cardDislike = cardDislike;
    this._confirmDelete = confirmDelete;

    //parameters
    this._userId = userId;
    this._likeCounts = cardData.likes.length;
    this._myLike = false;
  }

  //=================================== METHODS

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  //method like project 9:
  _handleLikeImage() {
    this._likeNum = this._cardElement.querySelector(
      ".elements__number-of-likes"
    );

    if (!this._myLike) {
      this._cardLike(this._cardId, this._likeNum);
      this._myLike = true;
    } else {
      this._cardDislike(this._cardId, this._likeNum);
      this._myLike = false;
    }
  }

  _likeCount() {
    this._likesArray.forEach((item) => {
      if (item._id === this._userId) {
        this._cardElement
          .querySelector(".elements__heart")
          .classList.add("elements__heart_active");
        this._myLike = true;
      }
    });
  }

  _confirmDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //only owner can remove card
  _ownerDeleteCard() {
    if (this._ownerId === this._userId) {
      this._cardElement.remove(".elements__trash_disabled"); //enables
      this._myLike = true;
    }
  }
  //================================================ LISTENERS
  setEventListeners() {
    // card likes
    this._cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", () => {
        this._handleLikeImage();
      });

    //delete card
    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._confirmDeleteCard(this._cardElement, this._cardId);
      });

    //preview image
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._imagePreview(this._link, this._name);
      });
  }
  //==============================================================

  render() {
    this._cardElement = this._getCardTemplate();

    this._cardElement.querySelector(".elements__text")
    .textContent = this._name;

    this._cardElement.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    this._likeNum.textContent = this._likeCounts;

    this._likeCount();
    this._ownerDeleteCard();
    this.setEventListeners();

    return this._cardElement;
  }
}
