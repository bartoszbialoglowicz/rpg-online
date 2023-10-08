import React, { useState } from "react";
import { Equipment, Item, ItemType } from "../utils/types";

type EquipmentContextObject = Equipment & {
    eqIsLoaded: boolean,
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
    eqIsLoaded: false,
    setEquipment: (eq: Equipment) => {},
    setItem: (item: Item) => {},
    removeItem: (slot: ItemType) => {}
}

export const EquipmentContext = React.createContext<EquipmentContextObject>(defaultState);

const EquipmentContextProvider: React.FC<{children: JSX.Element | JSX.Element[]}> = (props) => {

    // Store Player's EQ
    const [eq, setEq] = useState<Equipment>();
    // Store info if EQ was fetched from server
    const [eqIsLoaded, setEqIsLoaded] = useState(false);

    const setEqHandler = (eq: Equipment) => {
        setEq((prevState) => ({
            ...prevState,
            weapon: eq.weapon,
            armor: eq.armor,
            helmet: eq.helmet,
            trousers: eq.trousers,
            boots: eq.boots,
            gloves: eq.gloves
        }));
        setEqIsLoaded(true);
    };

    const setItemHandler = (item: Item) => {
        setEq((prevState) => ({
            ...prevState,
            [item.itemType]: item
        }));
        setEqIsLoaded(true);
    }

    const removeItemHandler = (slot: ItemType) => {
        setEq((prevState) => ({
            ...prevState,
            [slot]: undefined
        }));
        setEqIsLoaded(true);
    }

    const contextValue: EquipmentContextObject = {
        armor: eq?.armor,
        helmet: eq?.helmet,
        weapon: eq?.weapon,
        boots: eq?.boots,
        trousers: eq?.trousers,
        gloves: eq?.gloves,
        eqIsLoaded: eqIsLoaded,
        setEquipment: setEqHandler,
        setItem: setItemHandler,
        removeItem: removeItemHandler,
    };

    return <EquipmentContext.Provider value={contextValue}>{props.children}</EquipmentContext.Provider>
}

export default EquipmentContextProvider;