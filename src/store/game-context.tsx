import React, { useContext, useEffect, useState } from "react";
import { Resource, ResourceResponse, UserLvl } from "../types/UserTypes";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";
import { InventoryContext } from "./inventory-context";
import { StatsContext } from "./stats-context";
import { UserLocation } from "../types/GameTypes";

type GameContextObject = {
    userLocation: UserLocation
    resources: Resource,
    updateResources: (gold?: number, userLvl?: UserLvl) => void,
    updateTravelTime: (newTime: Date, startTravelTime: Date) => void
}

const defaultState: GameContextObject = {
    userLocation: {
        location: {
            name: '',
            lvlRequired: 1,
            id: 1,
            description: "",
            imageUrl: "",
            xCoordinate: 0,
            yCoordinate: 0
        },
        travelTime: new Date(),
        startTravelTime: new Date()
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
    const [resources, setResources] = useState<Resource>(defaultState.resources);

    const userCtx = useContext(UserContext);
    const inventoryCtx = useContext(InventoryContext);
    const statsCtx = useContext(StatsContext);

    const sendRequest = useHttp<UserLocation[]>('api/current_location', 'GET', undefined, userCtx.user!.authToken);
    const sendRequestResources = useHttp<ResourceResponse[]>('api/resources', 'GET', undefined, userCtx.user!.authToken);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            const {data: resourceData, code: resourceCode} = await sendRequestResources();
            if (code === 200) {
                const tmpTravelTime = new Date(data[0].travelTime);
                const tmpTravelStartTime = new Date(data[0].startTravelTime);
                setCurrentLocation(prevState => ({
                    ...data[0],
                    travelTime: tmpTravelTime,
                    startTravelTime: tmpTravelStartTime
                }));
            } else if (code === 401) {
                userCtx.logout();
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
            } else if (resourceCode === 401) {
                userCtx.logout();
            }
        };

        getData();
    }, []);

    useEffect(() => {
        statsCtx.updateItemsStats(inventoryCtx.equipment);
    }, [inventoryCtx.equipment]);

    useEffect(() => {
        inventoryCtx.updateLvlRef(resources.lvl.lvl);
    }, [resources.lvl])

    const applyExpPoint = (currentLvl: UserLvl, expPoint: UserLvl) => {
        let tmpLvl = currentLvl;
        console.log("current: " + tmpLvl.currentExp);
        tmpLvl.currentExp += expPoint.currentExp;
        console.log("next: " + tmpLvl.currentExp)
        if (tmpLvl.currentExp > tmpLvl.expPointsGap) {
            console.log('lvl up');
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
            tmpRes.lvl = userLvl;
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
        resources: resources,
        updateResources: updateResources,
        updateTravelTime: updateTravelTime,
    }
    
    return <GameContext.Provider value={gameContextValue}>
        {props.children}
    </GameContext.Provider>
};

export default GameContextProvider;