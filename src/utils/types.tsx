import User from "../models/User";

export type feedbackResult = 'success' | 'error';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';
export type inputType = 'email' | 'text' | 'password';
export type mainContentName = 'CHARACTER' | 'NEWS' | 'EQUIPMENT' | 'MAP' | 'STORE' | 'ENEMIES';
export type authContextObject = {
    isAuthenticated: boolean,
    user: User | null,
    login: (user: User) => void,
    logout: () => void
};

export type authState = {
    user: User | null;
    isAuthenticated: boolean;
}
export type Action = {
    type: 'LOGIN_USER' | 'LOGOUT_USER' | 'SET_IS_AUTHENTICATED';
    payload?: any;
}
export type responseObject<objType> = {
    code: number,
    data: objType
}
export type loginResponse = {
    id: number,
    user: string,
    email: string,
    token: string
};
export type errorResponse = {
    email?: string[],
    name?: string[],
    password?: string[],
}
export type resurcesResponse = [{
    gold: number,
    lvl: number,
    exp: number
}];
export type ItemType = 'weapon' | 'helmet' | 'armor' | 'gloves' |'trousers' | 'boots';
export type Item = {
    name: string;
    itemType: ItemType;
    armor: number;
    magicResist: number;
    health: number;
    damage: number;
};
export type Equipment = {
    weapon?: Item;
    helmet?: Item;
    armor?: Item;
    gloves?: Item;
    trousers?: Item;
    boots?: Item;
}
export type EquipmentResponseObject = {
    slot: ItemType;
    item: Item | null;
};
export type UserItemsResponseObject = {
    id: number;
    user: number;
    item: Item[];
};
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
export type ItemStatsValues = {
    name?: string;
    hpValue?: number;
    goldValue?: number;
    armor?: number;
    magicResist?: number;
    damage?: number;
    health?: number;
    hidden: boolean;
}
type InventoryItem = {
    id: number;
    item: Item;
    user: number;
}
type InventoryPotion = {
    id: number;
    potion: Potion;
    quantity: number;
    user: number;
}
type InventoryCollectableItem = {
    id: number;
    collectableItem: CollectableItem;
    quantity: number;
    user: number;
}
export type InventoryResponseObject = {
    items: InventoryItem[];
    potions: InventoryPotion[];
    collectableItems: InventoryCollectableItem[];
}

export type Location = {
    id: number;
    name: string;
    lvlRequired: number;
}

export type Character = {
    user: number,
    armor: number,
    magicResist: number,
    health: number,
    damage: number
}

export type GameContextObject = {
    location: Location,
    character: Character
}

export type UserLocationResponseObject = {
    user: number,
    id: number,
    location: Location
}

export type Store = {
    id: number,
    name: string,
    type: string,
    location: number
}
export type Enemy = {
    id: number;
    name: string;
    hp: number;
    armor: number;
    magicResist: number;
    damage: number;
    lvl: number;
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
    fightIsOver?: boolean
}