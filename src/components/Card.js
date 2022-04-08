export default class Card {
  constructor(
    cardData,
    imagePreview,
    likeImage,
    dislikeImage,
    confirmDelete,
    templateSelector, //main template
    userData
  ) {
    //info
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;

    // actions - listeners
    this._imagePreview = imagePreview;
    this._likeImage = likeImage;
    this._dislikeImage = dislikeImage;
    this._confirmDelete = confirmDelete;

    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userData = userData;

    this._myId = userData._profileId;

    //=================================== SELECTORS
    this._cardElement = templateSelector
      .querySelector(".elements__element")
      .cloneNode(true); //<li>  //card

    this._cardName = this._cardElement.querySelector(".elements__text");
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._btnDelete = this._cardElement.querySelector(".elements__trash");
    this._btnLike = this._cardElement.querySelector(".elements__heart");
    this._likeNum = this._cardElement.querySelector(
      ".elements__number-of-likes"
    );
  }

  //=================================== METHODS

  //method like project 9:
  _checkMyLikes() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._btnLike.classList.add("elements__heart_active");
      }
    });
  }

  _deleteByOwner() {
    if (this._ownerId === this._myId) {
      this._btnDelete.classList.remove("elements__trash_disabled");
    }
  }

  //================================================ LISTENERS

  _setEventListeners() {
    // card likes
    this._btnLike.addEventListener("click", async (event) => {
      if (!this._btnLike.classList.contains("elements__heart_active")) {
        try {
          const likes = await this._likeImage(this._cardId);
          if (likes) {
            event.target.classList.add("elements__heart_active");
            this._likeNum.textContent = likes.length;
            this._likeNum.style.display = "block";
          }
        } catch (err) {
          alert(err);
          console.log(err);
        }
      } else {
        try {
          const likes = await this._dislikeImage(this._cardId);
          if (likes) {
            event.target.classList.remove("elements__heart_active");
            this._likeNum.textContent = likes.length;
            if (likes.length == 0) {
              this._likeNum.textContent = "0";
            }
          }
        } catch (err) {
          alert(err);
          console.log(err);
        }
      }
    });

    //delete card
    this._btnDelete.addEventListener("click", () => {
      this._confirmDelete(this._cardElement, this._cardId, this._userData);
    });

    //preview image
    this._cardImage.addEventListener("click", () => {
      this._imagePreview(this._link, this._name);
    });
  }

  //====================================================
  renderCardElement() {
    this._cardName.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._likeNum.textContent = this._likes.length;

    this._deleteByOwner();
    this._checkMyLikes();
    this._setEventListeners();

    return this._cardElement;
  }
}