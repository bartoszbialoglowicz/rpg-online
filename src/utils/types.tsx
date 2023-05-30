import User from "../models/User";

export type feedbackResult = 'success' | 'error';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';
export type inputType = 'email' | 'text' | 'password';
export type mainContentName = 'CHARACTER' | 'NEWS' | 'EQUIPMENT' | 'MAP' | 'STORE';
export type authContextObject = {
    isAuthenticated: boolean,
    user: User | null,
    login: (user: User) => void,
    logout: () => void
};
export type GameContextObject = {
    location: Location,
}
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
export type Location = {
    id: number;
    name: string;
    lvlRequired: number;
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