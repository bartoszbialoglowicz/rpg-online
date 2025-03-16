import { NPC } from "./GameTypes"

export type Dialog = {
    id: number,
    npc: NPC,
    content: string
}

export type DialogOptions = {
    id: number,
    content: string,
    nextDialog?: number 
}