export default class Section {
    constructor({renderer}, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
  
    addItem(item) {
      // this._container.prepend(this._renderer(card, user));
      this._container.prepend(item);
    }

    renderCards(card, user) {
      card.forEach(card =>{
        // this.addItem(card, user)
        this._container = this._renderer(card, user);

      })
    }
  }