import { createContext, useContext, useEffect, useState } from "react";
import { Stats } from "../types/GameTypes";
import { useHttp } from "../hooks/use-http";
import { GameContext } from "./game-context";
import { UserContext } from "./user-context";
import { Character } from "../types/GameTypes";


const defaultState: Character = {
    baseStats: {
        damage: 0,
        armor: 0,
        magicResist: 0,
        health: 0
    },
    itemStats: {
        damage: 0,
        armor: 0,
        magicResist: 0,
        health: 0
    },
    getAllStats: () => ({health: 0, damage: 0, armor: 0, magicResist: 0})
}

export const StatsContext = createContext<Character>(defaultState);

export const StatsContextProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [baseStats, setBaseStats] = useState(defaultState.baseStats);
    const [itemStats, setItemStats] = useState(defaultState.itemStats);

    const userCtx = useContext(UserContext);

    const sendRequest = useHttp<Character>('api/character/get_all_stats/', 'GET', undefined, userCtx.user?.authToken);

    const getAllStats = () => {
        return {
            damage: baseStats.damage + itemStats.damage,
            health: baseStats.health + itemStats.health,
            magicResist: baseStats.magicResist + itemStats.magicResist,
            armor: baseStats.armor + itemStats.armor
        } as Stats
    }

    useEffect(() => {
        const getStats = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                setBaseStats(data.baseStats);
                setItemStats(data.itemStats);
            }

            getStats();
        }
    }, [])

    const contextData = {
        baseStats: baseStats,
        itemStats: itemStats,
        getAllStats: getAllStats
    }

    return <StatsContext.Provider value={contextData}>
        {props.children}
    </StatsContext.Provider>
};