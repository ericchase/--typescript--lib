type TInventory = Record<string, number>;
type CInventory = Record<string, number>;
type ItemType = string;

class Player {
  private readonly inventory: TInventory = {};

  hasItem(itemType: ItemType) {
    return itemType in this.inventory;
  }

  getItem(itemType: ItemType) {
    return this.inventory[itemType];
  }

  randomMethod(itemType: ItemType) {
    if (this.hasItem(itemType)) {
      const item = this.getItem(itemType);
    }
  }
}

const player = new Player();

console.log(player.hasItem('pizza'));

const item = player.getItem('pizza');
console.log(item);
