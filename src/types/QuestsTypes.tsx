import { Item } from "./ItemTypes"

type QuestProgress = 'completed' | 'in_progress' | 'not_started';
export type QuestRequirementType = 'kill' | 'collect' | 'explore' | 'talk';
export type QuestType = 'main' | 'side';

export interface QuestRequirement {
    id: number,
    progress: QuestProgress,
    target: string,
    target_id: number,
    position: number,
    path: number,
    is_last: boolean,
    type: QuestRequirementType
    amount?: number
};

export type Quest = {
    id: number,
    type: QuestType,
    title: string,
    description: string,
    expReward: number,
    itemReward?: Item,
    goldReward?: number,
}

export type UserQuestRequirement = {
    id: number,
    quest: number,
    requirement: QuestRequirement,
    progress: QuestProgress,
    amount_progress: number
}

export type UserQuest = {
    id: number,
    quest: Quest,
    progress: QuestProgress
    requirements: UserQuestRequirement[]
}