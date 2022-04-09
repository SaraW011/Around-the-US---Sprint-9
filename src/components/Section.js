export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // improve: make renderer as a generic function only for
  // creating a card (without adding it to the DOM),
  // then you could create cards inside the class
  // rather than creating them in index.js in 2 places.

  //  addItem(item) {
  //   const card = this._renderer(item)
  //   this._container.prepend(card);
  // }

  //render elements on page
  renderCards(items) {
    items.forEach((cardData) => {
      const card = this._renderer(cardData);
      this.addItem(card);
    });
  }
}
