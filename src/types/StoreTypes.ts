import { NPC } from "./GameTypes";
import { CollectableItem, Item, Potion } from "./ItemTypes";

export type Store = {
    id: number,
    name: string,
    type: string,
    location: number,
    npc: NPC
}
export type StoreElement = {
    id: number;
    store: Store;
    price: number;
}


export type StoreItem = StoreElement & {
    item: Item;
}
export type StorePotion = StoreElement & {
    potion: Potion;
}
export type StoreCollectableItem = StoreElement & {
    collectableItem: CollectableItem;
}