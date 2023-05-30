import React, { useContext, useEffect, useState } from "react";
import { GameContextObject, Location, UserLocationResponseObject } from "../utils/types";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";

const defaultState: GameContextObject = {
    location: {
        name: '',
        lvlRequired: 1,
        id: 1
    }
};

export const GameContext = React.createContext<GameContextObject>(defaultState);

const GameContextProvider: React.FC<{children: JSX.Element}> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<Location>(defaultState.location);

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<UserLocationResponseObject>('api/current_location', 'GET', undefined, userCtx.user!.authToken);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                setCurrentLocation(data.location)
            }
        };

        getData();
    });

    const gameContextValue = {
        location: currentLocation,
    }
    
    return <GameContext.Provider value={gameContextValue}>
        {props.children}
    </GameContext.Provider>
};

export default GameContextProvider;