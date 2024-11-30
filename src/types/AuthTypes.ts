import User from "../models/User";

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
}

export type Action = {
    type: 'LOGIN_USER' | 'LOGOUT_USER' | 'SET_IS_AUTHENTICATED';
    payload?: any;
}

export type AuthContextObject = {
    isAuthenticated: boolean,
    user: User | null,
    login: (user: User) => void,
    logout: () => void
};

export type LoginResponse = {
    id: number,
    user: string,
    email: string,
    token: string
};
export type ErrorResponse = {
    email?: string[],
    name?: string[],
    password?: string[],
}

export type inputType = 'email' | 'text' | 'password';