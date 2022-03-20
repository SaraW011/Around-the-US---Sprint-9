export default class Section {
    constructor({renderer }, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    renderer(itemsRendered) {
      itemsRendered.forEach(item =>{
        this.addItem(item)
      })
    }
  
    addItem(element) {
      this._container.prepend(this._renderer(element));
    }
  }