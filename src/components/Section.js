export default class Section {
    constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

  
    addItem(card, user) {
      this._container.prepend(this._renderer(card, user));
    }

    renderCards(card, user) {
      card.forEach(card =>{
        // this.addItem(card, user)
        this._container = this._renderer(card, user);
      })
    }

  }