export type ItemType = 'helmet' | 'weapon' | 'armor' | 'gloves' | 'trousers' | 'boots';
export type ItemRarity = 'common' | 'rare' | 'mythic' | 'legendary';

export type Item = {
    id: number,
    imageUrl: string,
    name: string,
    itemType: ItemType,
    armor: number,
    magicResist: number,
    health: number,
    damage: number,
    goldValue: number,
    rarity: ItemRarity,
    lvlRequired: number,
    criticalHitChance: number,
    criticalHitDamage: number
}

export type EquipmentItem = {
    slot: ItemType,
    item?: Item
}
export type Equipment = {
    helmet: EquipmentItem,
    weapon: EquipmentItem,
    armor: EquipmentItem,
    gloves: EquipmentItem,
    trousers: EquipmentItem,
    boots: EquipmentItem
}

export type Potion = {
    id: number;
    name: string;
    hpValue: number;
    goldValue: number;
}
export type CollectableItem = {
    id: number;
    name: string;
    goldValue: number;
}

export type InventoryItem = {
    id: number;
    item: Item;
    user: number;
}
export type InventoryPotion = {
    id: number;
    potion: Potion;
    quantity: number;
    user: number;
}
export type InventoryCollectableItem = {
    id: number;
    collectableItem: CollectableItem;
    quantity: number;
    user: number;
}

export type InventoryItems = {
    items: InventoryItem[],
    potions: InventoryPotion[],
    collectableItems: InventoryCollectableItem[]
}