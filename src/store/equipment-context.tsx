import React, { useContext, useEffect, useState } from "react";
import { Equipment, EquipmentResponseObject, Item, ItemType } from "../utils/types";
import { useHttp } from "../hooks/use-http";
import { UserContext } from "./user-context";

type EquipmentContextObject = Equipment & {
    setEquipment: (eq: Equipment) => void,
    setItem: (item: Item) => void,
    removeItem: (slot: ItemType) => void
}

const defaultState: EquipmentContextObject = {
    weapon: undefined,
    helmet: undefined,
    armor: undefined,
    trousers: undefined,
    boots: undefined,
    gloves: undefined,
    setEquipment: (eq: Equipment) => {},
    setItem: (item: Item) => {},
    removeItem: (slot: ItemType) => {}
}

export const EquipmentContext = React.createContext<EquipmentContextObject>(defaultState);

const EquipmentContextProvider: React.FC<{children: JSX.Element | JSX.Element[]}> = (props) => {

    const [eq, setEq] = useState<Equipment>();

    const userCtx = useContext(UserContext);

    const sendRequest = useHttp<EquipmentResponseObject[]>('api/equipment', 'GET', undefined, userCtx.user?.authToken);

    

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
        }
    }, []);

    const setEqHandler = (eq: Equipment) => {
        console.log('items-added');
        setEq((prevState) => ({
            ...prevState,
            weapon: eq.weapon,
            armor: eq.armor,
            helmet: eq.helmet,
            trousers: eq.trousers,
            boots: eq.boots,
            gloves: eq.gloves
        }));
        console.log('items-added');
    };

    const setItemHandler = (item: Item) => {
        setEq((prevState) => ({
            ...prevState,
            [item.itemType]: item
        }));
        
        console.log('items-added');
    }

    const removeItemHandler = (slot: ItemType) => {
        setEq((prevState) => ({
            ...prevState,
            [slot]: undefined
        }));
    }

    const contextValue: EquipmentContextObject = {
        armor: eq?.armor,
        helmet: eq?.helmet,
        weapon: eq?.weapon,
        boots: eq?.boots,
        trousers: eq?.trousers,
        gloves: eq?.gloves,
        setEquipment: setEqHandler,
        setItem: setItemHandler,
        removeItem: removeItemHandler
    };

    return <EquipmentContext.Provider value={contextValue}>{props.children}</EquipmentContext.Provider>
}

export default EquipmentContextProvider;