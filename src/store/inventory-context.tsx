import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { useHttp } from "../hooks/use-http";
import { CollectableItem, Equipment, EquipmentItem, InventoryCollectableItem, InventoryItem, InventoryItems, InventoryPotion, Item, Potion } from "../types/ItemTypes";

type InventoryContextObject = {
    equipment: Equipment,
    inventory: InventoryItems,
    removeFromInventory: (item: Item | Potion | CollectableItem) => void
}

const defaultState: InventoryContextObject = {
    equipment: {
        helmet: {
            item: undefined,
            slot: 'helmet'
        },
        weapon: {
            item: {
                name: 'test',
                damage: 1,
                imageUrl: '',
                id: 1,
                itemType: "weapon",
                armor: 1,
                magicResist: 1,
                health: 1,
                goldValue: 1,
                rarity: 'common'
            },
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
    removeFromInventory: (item: Item | CollectableItem | Potion) => {}
} 

export const InventoryContext = createContext(defaultState);

export const InventoryContextProvider: React.FC<{children: JSX.Element}> = (props) => {

    const [equipment, setEquiment] = useState<Equipment>(defaultState.equipment);
    const [inventory, setInventory] = useState<InventoryItems>(defaultState.inventory);

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
                    // Przypisz każdy slot do odpowiedniego pola w Equipment
                    if (["helmet", "weapon", "armor", "gloves", "trousers", "boots"].includes(slot)) {
                      tmpEq[slot as keyof Equipment] = {
                        slot,
                        item: item || undefined, // Jeśli `item` to null, ustaw jako undefined
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

    const removeItemHandler = (item: Item | CollectableItem | Potion) => {
        if ('itemType' in item) {
            let tmpArr = inventory.items.slice();
            const index = tmpArr.findIndex(el => el.item.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                inventory: {
                    ...prevState.collectableItems,
                    ...prevState.potions,
                    items: tmpArr
                }
            }))
        }
        else if ('hpValue' in item) {
            let tmpArr = inventory.potions.slice();
            const index = tmpArr.findIndex(el => el.potion.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                inventory: {
                    ...prevState.items,
                    ...prevState.collectableItems,
                    potions: tmpArr
                }
            }))
        }
        else {
            let tmpArr = inventory.collectableItems.slice();
            const index = tmpArr.findIndex(el => el.collectableItem.id === item.id);
            tmpArr.splice(index, 1);
            setInventory(prevState => ({
                ...prevState,
                inventory: {
                    ...prevState.items,
                    ...prevState.potions,
                    collectableItems: tmpArr
                }
            }))
        }
    }

    const contextValue = {
        equipment: equipment,
        inventory: inventory,
        removeFromInventory: removeItemHandler
    };

    return <InventoryContext.Provider value={contextValue}>
        {props.children}
    </InventoryContext.Provider>
};