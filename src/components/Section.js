export default class Section {
    constructor({renderer}, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
    
    //add card to the container
    addItem(element) {
      this._container.prepend(element);
    }

    // renderCards(card) {
    //   card.forEach(element =>{
    //     this._container = this._renderer(element);
    //   })
    // }

    //render elements on page 

    renderCards(items) {
      items.forEach((cardData) => {
        const card = this._renderer(cardData);
        this.addItem(card);
      });
    }

  }