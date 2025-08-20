import type { NPC } from "./GameTypes";

export type DialogOptionEffect = {
    fight?: boolean,
    trade?: boolean,
    quest?: boolean,
    exit?: boolean
}

export type DialogOptions = {
    id: number,
    content: string,
    next_dialog?: number,
    effects: DialogOptionEffect | null;
}

export type Dialog = {
    id: number,
    npc: NPC,
    content: string,
    options: DialogOptions[],
    starter: boolean
}