import { Character } from "../types/GameTypes";
import { Item } from "../types/ItemTypes";
import { Resource, UserLvl } from "../types/UserTypes";

export type mainContentName = 'CHARACTER' | 'NEWS' | 'EQUIPMENT' | 'MAP' | 'STORE' | 'ENEMIES';

export type ButtonController = {
    onClick: Function,
    text: string
};

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
    character?: Character,
    message?: string,
    loot?: string,
    strike?: number,
    fightIsOver?: boolean,
    exp?: number,
    expPoints?: number,
    lvl?: number,
}