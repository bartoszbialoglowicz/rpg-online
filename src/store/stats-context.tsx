import { createContext, useContext, useEffect, useState } from "react";
import { Stats } from "../types/GameTypes";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";
import { Character } from "../types/GameTypes";
import { Equipment } from "../types/ItemTypes";


const defaultState: Character = {
    baseStats: {
        damage: 0,
        armor: 0,
        magicResist: 0,
        health: 0,
        criticalHitChance: 0,
        criticalHitDamage: 0
    },
    itemStats: {
        damage: 0,
        armor: 0,
        magicResist: 0,
        health: 0,
        criticalHitChance: 0,
        criticalHitDamage: 0,
    },
    getAllStats: () => ({health: 0, damage: 0, armor: 0, magicResist: 0, criticalHitDamage: 0, criticalHitChance: 0}),
    updateItemsStats: () => {}
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
        }

        getStats();
    }, [])

    const updateEquipmentStats = (equipment: Equipment) => {
        const newStats: Stats = Object.values(equipment).reduce<Stats>(
            (sum, eqItem) => {
                if (eqItem.item) {
                   return {
                        damage: sum.damage + eqItem.item.damage,
                        health: sum.health + eqItem.item.health,
                        magicResist: sum.magicResist + eqItem.item.magicResist,
                        armor: sum.armor + eqItem.item.armor,
                        criticalHitChance: sum.criticalHitChance + eqItem.item.criticalHitChance,
                        criticalHitDamage: sum.criticalHitDamage + eqItem.item.criticalHitDamage
                   } 
                }
                return sum;
            },
            {damage: 0, health: 0, magicResist: 0, armor: 0, criticalHitChance: 0, criticalHitDamage: 0}
        );
        setItemStats(newStats);
    };

    const contextData = {
        baseStats: baseStats,
        itemStats: itemStats,
        getAllStats: getAllStats,
        updateItemsStats: updateEquipmentStats
    }

    return <StatsContext.Provider value={contextData}>
        {props.children}
    </StatsContext.Provider>
};