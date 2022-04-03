export default class Card {
  constructor(
    cardData, imagePreview, likeImage, dislikeImage, confirmDelete,
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

  // _getCardTemplate() {
  //   this._cardElement = this._cardTemplate
  //   .querySelector(".elements__element")   //<li>
  //   .cloneNode(true);
  //   return this._cardElement;
  // }

    //method like project 9:

  // _handleLikeImage(event){
  //   if (!this._btnLike.classList.contains('elements__heart_active')) {
  //     try {
  //       const likes = await this._likeImage(this._cardId);
  //       if (likes) {
  //         event.target.classList.add('elements__heart_active');
  //         this._likeNum.textContent = likes.length;
  //         this._likeNum.style.display = 'block';
  //       }
  //     }
  //     catch (err) {
  //       alert(err);
  //       console.log(err);
  //     }
  //   } else {
  //     try {
  //       const likes = await this._dislikeImage(this._cardId);
  //       if (likes) {
  //         event.target.classList.remove('elements__heart_active');
  //         this._likeNum.textContent = likes.length;
  //         if (likes.length === 0) {
  //           this._likeNum.style.display = 'none';
  //         }
  //       }
  //     }
  //     catch (err) {
  //       alert(err);
  //       console.log(err);
  //     }
  //   }
  // }


  _countLikeNum() {
  if (this._likes.length < 1) {
    this._likeNum.textContent = "0";
  } else {
    this._likeNum.textContent = this._likes.length;
}
}

// _updateLike() {
//   this._btnLike.classList.toggle('elements__heart_active');
//   if (this._likeNum.textContent == 0) {
//       this._likeNum.textContent = "?";
//   }
// }

// _checkInitialLike() {
//   const isLiked = this._likes.some(user => user._id === this._userData)
//   if (isLiked) {
//     this.updateLike(this._likes);
//     // this._btnLike.classList.add('elements__heart_active');
//   }
// }

  _confirmDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // //only owner can remove card
  _ownerDeleteCard() {
    if (this._ownerId !== this._userData) {
       this._btnDelete.style.display = "none";
    }
  }

  //================================================ LISTENERS

  _setEventListeners() {
    // card likes

    this._btnLike.addEventListener("click", async (event) => {
      // this._handleLikeImage()
      if (!this._btnLike.classList.contains('elements__heart_active')) {
        try {
          const likes = await this._likeImage(this._cardId);
          if (likes) {
            event.target.classList.add('elements__heart_active');
            this._likeNum.textContent = likes.length;
            this._likeNum.style.display = 'block';
          }
        }
        catch (err) {
          alert(err);
          console.log(err);
        }
      } else {
        try {
          const likes = await this._dislikeImage(this._cardId);
          if (likes) {
            event.target.classList.remove('elements__heart_active');
            this._likeNum.textContent = likes.length;
            if (likes.length === 0) {
              this._likeNum.style.display = 'none';
            }
          }
        }
        catch (err) {
          alert(err);
          console.log(err);
        }
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
    this._countLikeNum();
    this._ownerDeleteCard();
    this._setEventListeners();
    // this._checkInitialLike()

    return this._cardElement;
  }
}