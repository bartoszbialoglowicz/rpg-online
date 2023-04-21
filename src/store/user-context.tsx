import React, { useEffect, useState } from "react";
import { authContextObject } from "../utils/types";
import User from "../models/User";

const defaultUser = new User(-1, '', '', '');

export const UserContext = React.createContext<authContextObject>({
    isAuthenticated: false,
    user: defaultUser,
    login: (user: User) => {},
    logout: () => {}
});

const UserContextProvider: React.FC<{children: JSX.Element}>= (props) => {
    const [user, setUser] = useState(defaultUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const loginHandler = (user: User) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
    }
    const logoutHandler = () => {
        setUser(defaultUser);
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            loginHandler(JSON.parse(stored));
        }
    }, []);

    const userContextValue = {
        isAuthenticated: isAuthenticated,
        user: user,
        login: loginHandler,
        logout: logoutHandler
    };

    return <UserContext.Provider value={userContextValue}>
        {props.children}
    </UserContext.Provider>
};

export default UserContextProvider;