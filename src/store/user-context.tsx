import React, { useEffect, useReducer, type JSX} from "react";
import type { Action, AuthContextObject, AuthState } from "../types/AuthTypes";

import User from "../models/User";

const defaultState: AuthContextObject = {
    user: null,
    isAuthenticated: false,
    login: (user: User) => {},
    logout: () => {}
}

const reducer = (state: AuthState, action: Action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...state, user: action.payload}
        case 'LOGOUT_USER':
            return {...state, user: null}
        case 'SET_IS_AUTHENTICATED':
            return {...state, isAuthenticated: action.payload}
        default:
            return state;
    }
}

export const UserContext = React.createContext<AuthContextObject>(defaultState);

const UserContextProvider: React.FC<{children: JSX.Element}>= (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            dispatch({type: 'LOGIN_USER', payload: JSON.parse(stored)});
            dispatch({type: 'SET_IS_AUTHENTICATED', payload: true})
        }
    }, []);

    const loginHandler = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN_USER', payload: user});
        dispatch({type: 'SET_IS_AUTHENTICATED', payload: true});
    }
    const logoutHandler = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT_USER'});
        dispatch({type: 'SET_IS_AUTHENTICATED', payload: false})
    }
    const userContextValue = {
        ...state,
        login: loginHandler,
        logout: logoutHandler
    };

    return <UserContext.Provider value={userContextValue}>
        {props.children}
    </UserContext.Provider>
};

export default UserContextProvider;