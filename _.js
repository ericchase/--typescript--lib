class Player {
  inventory = {};
  hasItem(itemType) {
    return itemType in this.inventory;
  }
  getItem(itemType) {
    return this.inventory[itemType];
  }
  randomMethod(itemType) {
    if (this.hasItem(itemType)) {
      const item = this.getItem(itemType);
    }
  }
}
const player = new Player();
console.log(player.hasItem('pizza'));
const item = player.getItem('pizza');
console.log(item);
export {};
