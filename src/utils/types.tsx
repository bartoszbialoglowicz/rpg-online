import User from "../models/User";

export type feedbackResult = 'success' | 'error';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';
export type inputType = 'email' | 'text' | 'password';
export type mainContentName = 'CHARACTER' | 'NEWS';
export type authContextObject = {
    isAuthenticated: boolean,
    user: User,
    login: (user: User) => void,
    logout: () => void
};
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
}]