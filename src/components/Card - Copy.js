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
    // this._myLike = false;

    // actions - listeners
    this._imagePreview = imagePreview;
    this._likeImage = likeImage;
    this._dislikeImage = dislikeImage;
    this._confirmDelete = confirmDelete;

    this._likes = cardData.likes;
    // this._likesNum = cardData.likes.length;

    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userData = userData;
    this._myLike = false;

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
  _updateLikeNumber() {
    if (this._likes.length < 1) {
      this._likeNum.textContent = "0";
    } else {
      this._likeNum.textContent = this._likes.length;
    }
  }

  _myLikes() {
    this._likes.forEach((card) => {
        if (card._id === this._userData) {
            this._btnLike.classList.add('elements__heart_active');
            this._myLike = true;
        }
    });
}

  _confirmDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // //only owner can remove card
  // _ownerDeleteCard() {
  //   if (this._ownerId !== this._userData) {
  //     this._btnDelete.style.display = "none";
  //   }
  // }

  //================================================ LISTENERS
  _setEventListeners() {
    // card likes

    this._btnLike.addEventListener("click", (event) => {
      // this._handleLikeImage()
      // if (!this._btnLike.classList.contains("elements__heart_active")) {
      //   try {
      //     const likes = await this._likeImage(this._cardId);
      //     if (likes) {
      //       event.target.classList.add("elements__heart_active");
      //       this._likeNum.textContent = likes.length;
      //       this._likeNum.style.display = "block";
      //     }
      //   } catch (err) {
      //     alert(err);
      //     console.log(err);
      //   }
      // } else {
      //   try {
      //     const likes = await this._dislikeImage();
      //     if (likes) {
      //       event.target.classList.remove("elements__heart_active");
      //       this._likeNum.textContent = likes.length;
      //     }
      //   } catch (err) {
      //     alert(err);
      //     console.log(err);
      //   }
      // }

      if (!this._myLike) {
        this._likeImage(event, this._cardId, this._likeNum);
        this._myLike = true;
    } else {
        this._dislikeImage(event, this._cardId, this._likeNum);
        this._myLike = false;
    }


    });

    //delete card
    this._btnDelete.addEventListener("click", () => {
      this._confirmDeleteCard(this._cardId);
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
    this._updateLikeNumber();
    this._myLikes()
    // this._ownerDeleteCard();
    this._setEventListeners();

    return this._cardElement;
  }
}