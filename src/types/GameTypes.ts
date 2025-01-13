import { Equipment, Item } from "./ItemTypes"

export type Stats = {
    damage: number,
    armor: number,
    magicResist: number,
    health: number,
    criticalHitChance: number,
    criticalHitDamage: number
}

export type Character = {
    baseStats: Stats,
    itemStats: Stats,
    getAllStats: () => Stats,
    updateItemsStats: (equipment: Equipment) => void
}

export type StatsContextState = {
    baseStats: Stats,
    itemStats: Stats,
    getAllStats: () => Stats,
    updateItemsStats: (equipment: Equipment) => void,
    compareStats: (compared: Item, equipped?: Item) => void,
    clearComparedItem: () => void,
    comparedItem?: Item,
    equippedItem?: Item
}

export type NPC = {
    id: number,
    name: string,
    imageUrl: string,
    location: number
}

export type Enemy = {
    id: number;
    name: string;
    health: number;
    armor: number;
    magicResist: number;
    damage: number;
    lvl: number;
    imgSrc: string;
}

export type WebSocketMessage = {
    action?: string,
    type?: string,
    enemyId?: number,
    userEmail?: string,
    enemy?: Enemy,
    character?: Stats,
    message?: string,
    loot?: Item,
    strike?: number,
    fightIsOver?: boolean,
    exp?: number,
    expPoints?: number,
    lvl?: number,
    criticalHit?: boolean,
    userDamageDealt?: number,
    enemyDamageDealt?: number,
    messageShort?: string,
}

export type Location = {
    id: number;
    name: string;
    lvlRequired: number;
    imageUrl: string;
    description: string;
}

export type UserLocation = {
    location: Location,
    travelTime: Date,
    startTravelTime: Date
}