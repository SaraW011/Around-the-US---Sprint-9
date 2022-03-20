export default class Card {
  constructor(
    cardData,
    userId,
    imagePreview,
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
    this.cardLike = cardLike;
    this.likeCounts = cardData.likes;
    this._confirmDelete = confirmDelete;
    this._templateSelector = templateSelector;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(".elements__element");
  }

  // _getTemplate() {
  //   return this._templateSelector
  //     .querySelector(".elements__element")
  //     .cloneNode(true);
  // }

  //method like count project 9:
  _likeCount() {
    this._cardElement.querySelector(".elements__number-of-likes").textContent =
      this.likeCounts.length;

    this.likeCounts.forEach((like) => {
      if (like._id === this._userId) {
        this._cardElement
          .querySelector(".elements__heart")
          .classList.add(".elements__heart_active");
      }
    });
  }

  //only owner can remove card
  _handleDeleteCard() {
    if (this._owner === this._userId) {
      this._cardElement.remove();
      this._cardElement = null;
    }
  }

  setEventListeners() {
    // card likes
    this._cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", () => {
        this._likeCount();
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
    // this._cardElement = this._templateSelector()
    // .querySelector(".elements__element").cloneNode(true);
    this._cardElement = this._template.cloneNode(true);

    this._cardElement.querySelector(".elements__text").textContent = this._name;

    this._cardElement.querySelector(
      ".elements__image"
    ).style.backgroundImage = `url(${this._link})`;

    this.setEventListeners();

    return this._cardElement;
  }
}
