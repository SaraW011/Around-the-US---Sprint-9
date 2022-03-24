export default class Card {
  constructor(
    cardData,
    imagePreview,
    userId,
    cardLike,
    cardDislike,
    confirmDelete,
    templateSelector
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._userId = userId;
    this._cardId = cardData._id;
    this._owner = cardData.owner._id;
    this._imagePreview = imagePreview;
    this._cardDislike = cardDislike;
    this._cardLike = cardLike;
    this._likeCounts = cardData.likes.length;
    this._likesArray = cardData.likes;
    this._myLike = false;
    this._confirmDelete = confirmDelete;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }


  //method like count project 9:
  _likeCount() {
    this._likeNum.textContent = this._likeCounts

    this._likesArray.forEach((like) => {
      if (like._id === this._userId) {
        this._cardElement
          .querySelector(".elements__heart")
          .classList.add("elements__heart_active");
          this._myLike = true;
      }
    });
  }

  //only owner can remove card
  _handleDeleteCard() {
    if (this._owner === this._userId) {
      this._cardElement.remove(".elements__trash_disabled");
      this._cardElement = null;
    }
  }

  setEventListeners() {
    // card likes
    this._likeNum = this._cardElement.querySelector(".elements__number-of-likes")
    
    this._cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", event => {
        if (!this._myLike) {
          this._cardLike(event, this._cardId, this._likeNum);
          this._myLike = true;
      } else {
          this._cardDislike(event, this._cardId, this._likeNum);
          this._myLike = false;
      }
      });

    //delete card
    this._cardElement
      .querySelector(".elements__trash")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._cardElement, this._cardId);
      });

    //preview image
    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._imagePreview(this._link, this._name);
      });
  }

  render() {

    this._cardElement = this._getTemplate()
    
    this._cardElement.querySelector(".elements__text")
    .textContent = this._name;

    this._cardElement.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    this.setEventListeners();
    this._likeCount()

    return this._cardElement;
  }
}
