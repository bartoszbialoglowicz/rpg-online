import React, { useContext, useEffect, useState } from "react";
import { Character, GameContextObject, Location, UserLocationResponseObject } from "../utils/types";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";

const defaultState: GameContextObject = {
    location: {
        name: '',
        lvlRequired: 1,
        id: 1
    },
    character: {
        user: -1,
        armor: 0,
        magicResist: 0,
        health: 0,
        damage: 0
    }
};

export const GameContext = React.createContext<GameContextObject>(defaultState);

const GameContextProvider: React.FC<{children: JSX.Element}> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<Location>(defaultState.location);
    const [character, setCharacter] = useState<Character>(defaultState.character);

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<UserLocationResponseObject>('api/current_location', 'GET', undefined, userCtx.user!.authToken);
    const sendRequestCharacter = useHttp<Character[]>('api/character', 'GET', undefined, userCtx.user!.authToken);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            const {data: charData, code: charCode} = await sendRequestCharacter();
            if (code === 200) {
                setCurrentLocation(data.location)
            }
            if (charCode === 200) {
                setCharacter(charData[0])
            }
        };

        getData();
    }, []);

    const gameContextValue = {
        location: currentLocation,
        character: character
    }
    
    return <GameContext.Provider value={gameContextValue}>
        {props.children}
    </GameContext.Provider>
};

export default GameContextProvider;