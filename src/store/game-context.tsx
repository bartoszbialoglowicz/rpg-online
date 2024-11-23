import React, { useContext, useEffect, useState } from "react";
import { Character, GameContextObject, Location, Resource, ResourceResponse, UserLocation, UserLvl } from "../utils/types";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";

const defaultState: GameContextObject = {
    userLocation: {
        location: {
            name: '',
            lvlRequired: 1,
            id: 1,
            description: "",
            imageUrl: "",
        },
        travelTime: new Date(),
        startTravelTime: new Date()
    },
    character: {
        user: -1,
        armor: 0,
        magicResist: 0,
        health: 0,
        damage: 0
    },
    resources: {
        gold: 0,
        lvl: {currentExp: 0, lvl: 0, expPointsGap: 0}
    },
    updateResources: (gold?: number, userLvl?: UserLvl) => null,
    updateTravelTime: (newTime: Date, travelStartTime: Date) => null,
};

export const GameContext = React.createContext<GameContextObject>(defaultState);

const GameContextProvider: React.FC<{children: JSX.Element}> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<UserLocation>(defaultState.userLocation);
    const [character, setCharacter] = useState<Character>(defaultState.character);
    const [resources, setResources] = useState<Resource>(defaultState.resources);

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<UserLocation[]>('api/current_location', 'GET', undefined, userCtx.user!.authToken);
    const sendRequestCharacter = useHttp<Character[]>('api/character', 'GET', undefined, userCtx.user!.authToken);
    const sendRequestResources = useHttp<ResourceResponse[]>('api/resources', 'GET', undefined, userCtx.user!.authToken);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            const {data: charData, code: charCode} = await sendRequestCharacter();
            const {data: resourceData, code: resourceCode} = await sendRequestResources();
            if (code === 200) {
                const tmpTravelTime = new Date(data[0].travelTime);
                const tmpTravelStartTime = new Date(data[0].startTravelTime);
                setCurrentLocation(prevState => ({
                    ...data[0],
                    travelTime: tmpTravelTime,
                    startTravelTime: tmpTravelStartTime
                }));
            }
            if (charCode === 200) {
                setCharacter(charData[0])
            }
            if (resourceCode === 200) {
                let tmpRes: Resource = {
                    gold: resourceData[0].gold,
                    lvl: {
                        currentExp: resourceData[0].exp,
                        expPointsGap: resourceData[0].lvl.expPoints,
                        lvl: resourceData[0].lvl.lvl
                    }
                }
                setResources(tmpRes);
            }
        };

        getData();
    }, []);

    const applyExpPoint = (currentLvl: UserLvl, expPoint: UserLvl) => {
        let tmpLvl = currentLvl;
        tmpLvl.currentExp += expPoint.currentExp;
        if (tmpLvl.currentExp > tmpLvl.expPointsGap) {
            tmpLvl.lvl ++;
            tmpLvl.currentExp = (currentLvl.currentExp + expPoint.currentExp) - tmpLvl.expPointsGap;
            tmpLvl.expPointsGap = expPoint.expPointsGap;
        }

        return tmpLvl;
    }

    const updateResources = (gold?: number, userLvl?: UserLvl) => {
        let tmpRes = resources;
        if (gold) {
            tmpRes.gold += gold;
        }
        if (userLvl) {
            tmpRes.lvl = applyExpPoint(tmpRes.lvl, userLvl);
        }
        setResources({...tmpRes});
    }

    const updateTravelTime = (newTime: Date, startTravelTime: Date) => {
        setCurrentLocation(prevState => ({
            ...prevState,
            travelTime: newTime,
            startTravelTime: startTravelTime
        }));
    }

    const gameContextValue = {
        userLocation: currentLocation,
        character: character,
        resources: resources,
        updateResources: updateResources,
        updateTravelTime: updateTravelTime,
    }
    
    return <GameContext.Provider value={gameContextValue}>
        {props.children}
    </GameContext.Provider>
};

export default GameContextProvider;