export class Inventory {

  
  constructor() {
    this.items = new Map();
  }

  addItem(item) {

    if (this.items.has(item.id)) {
      return;
    }

    this.items.set(
      item.id,
      item
    );

    console.log(
      "Inventory:",
      this.getItems()
    );
  }

  removeItem(itemId) {

    if (!this.items.has(itemId)) {
      return false;
    }

    this.items.delete(itemId);

    return true;
  }

  hasItem(itemId) {
    return this.items.has(itemId);
  }

  getItem(itemId) {
    return this.items.get(itemId);
  }

  getItems() {
    return Array.from(
      this.items.values()
    );
  }
}