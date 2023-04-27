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