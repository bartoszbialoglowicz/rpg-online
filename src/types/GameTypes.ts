export type Stats = {
    damage: number,
    armor: number,
    magicResist: number,
    health: number
}

export type Character = {
    baseStats: Stats,
    itemStats: Stats,
    getAllStats: () => Stats
}