export type UserLvl = {
    lvl: number,
    currentExp: number,
    expPointsGap: number
}

export type Resource = {
    gold: number,
    lvl: UserLvl
};

export type ResourceResponse = {
    id: number;
    lvl: {
        lvl: number,
        expPoints: number,
    },
    gold: number,
    exp: number,
    user: number
}