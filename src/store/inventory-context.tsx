import React, { createContext, useContext, useEffect, useState, type JSX } from "react";
import { UserContext } from "./user-context";
import { useHttp } from "../hooks/use-http";
import type { CollectableItem, Equipment, EquipmentItem, InventoryCollectableItem, InventoryItem, InventoryItems, InventoryPotion, Item, Potion } from "../types/ItemTypes";

type InventoryContextObject = {
    equipment: Equipment,
    inventory: InventoryItems,
    removeItemFromInventory: (item: Item | Potion | CollectableItem) => void,
    removeItemsFromInventory: (items: Item[] | CollectableItem[] | Potion[]) => void,
    replaceEquipmentItem: (item: Item) => void,
    addInventoryItem: (item: Item) => void,
    addInventoryItems: (items: Item[]) => void,
    updateLvlRef: (lvl: number) => void,
}

const defaultState: InventoryContextObject = {
    equipment: {
        helmet: {
            item: undefined,
            slot: 'helmet'
        },
        weapon: {
            item: undefined,
            slot: 'weapon'
        },
        armor: {
            item: undefined,
            slot: 'armor'
        },
        trousers: {
            item: undefined,
            slot: 'trousers'
        },
        gloves: {
            item: undefined,
            slot: 'gloves'
        },
        boots: {
            item: undefined,
            slot: 'boots'
        }                            
    },
    inventory: {
        items: [],
        potions: [],
        collectableItems: []
    },
    removeItemFromInventory: (item: Item | CollectableItem | Potion) => {},
    removeItemsFromInventory: (item: Item[] | CollectableItem[] | Potion[]) => {},
    replaceEquipmentItem: (item: Item) => {},
    addInventoryItem: (item: Item) => {},
    addInventoryItems: (items: Item[]) => {},
    updateLvlRef: () => {}
} 

export const InventoryContext = createContext(defaultState);

export const InventoryContextProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [equipment, setEquiment] = useState<Equipment>(defaultState.equipment);
    const [inventory, setInventory] = useState<InventoryItems>(defaultState.inventory);
    const [userLvlRef, setUserLvlRef] = useState(0);

    const userCtx = useContext(UserContext);

    const sendEqRequest = useHttp<EquipmentItem[]>('api/equipment/', 'GET', undefined, userCtx.user?.authToken);
    const sendInventoryRequest = useHttp<InventoryItems>('api/inventory/', 'GET', undefined, userCtx.user?.authToken);

    useEffect(() => {
        const loadEquipment = async () => {
            const {code, data} = await sendEqRequest();
            if (code === 200) {
                const tmpEq: Equipment = defaultState.equipment;
                data.forEach((slotData) => {
                    const { slot, item } = slotData;
                    if (["helmet", "weapon", "armor", "gloves", "trousers", "boots"].includes(slot)) {
                      tmpEq[slot as keyof Equipment] = {
                        slot,
                        item: item || undefined,
                      } as EquipmentItem;
                    }
                });
                setEquiment(tmpEq);
            }
        }

        const loadInventory = async () => {
            const {code, data} = await sendInventoryRequest();

            if (code === 200) {
                setInventory(data);
            }
        };

        loadEquipment();
        loadInventory();    
    }, []);

    const updateServerEquipmentSlot = async (slot: string, itemId: number | null) => {
        const url = `api/equipment/${slot}/replace_item/`;
        const { code, data } = await sendEqRequest(url, 'PATCH', { item: itemId });
    
        if (code !== 200) {
          console.error(`Failed to update slot "${slot}" with item ID: ${itemId}`);
        }
      };
    
    const removeItemHandler = (item: Item | CollectableItem | Potion) => {
        if ('itemType' in item) {
            let tmpArr = inventory.items.slice();
            const index = tmpArr.findIndex(el => el.item.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                items: tmpArr
            }));
        }
        else if ('hpValue' in item) {
            let tmpArr = inventory.potions.slice();
            const index = tmpArr.findIndex(el => el.potion.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                potions: tmpArr
            }))
        }
        else {
            let tmpArr = inventory.collectableItems.slice();
            const index = tmpArr.findIndex(el => el.collectableItem.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                collectableItems: tmpArr
            }))
        }
    };

    const removeItemsHandler = (items: Item[] | CollectableItem[] | Potion[]) => {
        items.forEach(item => {
            removeItemHandler(item);
        })
    };

    const addInventoryItem = (item: Item) => {
        const tmpInv = inventory.items;
        const invItem: InventoryItem = {
            item: item,
            user: userCtx.user!.id,
            id: tmpInv[tmpInv.length - 1].id + 1
        }
        tmpInv.push(invItem);

        setInventory(prevState => ({
            ...prevState,
            items: tmpInv
        }))
    }

    const addInventoryItems = (items: Item[]) => {
        items.forEach(item => addInventoryItem(item));
    };

    const replaceEquipmentItem = (item: Item) => {
        if (item.lvlRequired > userLvlRef)
            throw Error('This item requires higher lvl!');
        const slot = item.itemType;
        const eqSlot = equipment[slot];
        if (eqSlot.item)
            addInventoryItem(eqSlot.item)
        const tmpEq = equipment;
        tmpEq[slot].item = item;
        removeItemHandler(item);
        setEquiment(prevState => ({
            ...prevState,
            slot: tmpEq[slot].item
        }));

        updateServerEquipmentSlot(slot, item.id);
    }

    const updateLvlRefHandler = (lvl: number) => {
        setUserLvlRef(lvl);
    }

    const contextValue = {
        equipment: equipment,
        inventory: inventory,
        removeItemFromInventory: removeItemHandler,
        removeItemsFromInventory: removeItemsHandler,
        replaceEquipmentItem: replaceEquipmentItem,
        addInventoryItem: addInventoryItem,
        addInventoryItems: addInventoryItems,
        updateLvlRef: updateLvlRefHandler
    };

    return <InventoryContext.Provider value={contextValue}>
        {props.children}
    </InventoryContext.Provider>
};