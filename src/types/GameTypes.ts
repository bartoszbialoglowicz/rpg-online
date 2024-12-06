import { Equipment } from "./ItemTypes"

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