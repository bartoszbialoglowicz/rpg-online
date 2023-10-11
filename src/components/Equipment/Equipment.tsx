import CharacterStatsContainer from "../Character/CharacterStatsContainer";
import EquipmentItemsContainer from "./EquipmentItemsContainer";
import UserItemContainer from "./UserItemContainer";

import './Equipment.css';
import { useContext, useEffect, useRef, useState } from "react";
import { EquipmentResponseObject, Item, Equipment as EquipmentType, ItemType, ButtonController, Potion, CollectableItem, InventoryResponseObject } from "../../utils/types";
import { UserContext } from "../../store/user-context";
import { useHttp } from "../../hooks/use-http";
import { EquipmentContext } from "../../store/equipment-context";

const Equipment = () => {
    // Store bool for Equipment change signal
    const [eqChanged, setEqChanged] = useState(false);
    // Store item that will be replacing the other one in user Eq
    const [itemToReplaceWith, setItemToReplaceWith] = useState<Item | null>();
    // Store bool which makes signal to update Stats component
    const [updateStats, setUpdateStats] = useState(false);
    // Store stats difference between items
    const [itemToCompare, setItemToCompare] = useState<Item>();
    // Store User's equipped items
    const [equipment, setEquipment] = useState<EquipmentType>({});
    // Track user equipment
    const prevEquipmentRef = useRef(eqChanged);

    // Store items already collected by users
    const [items, setItems] = useState<Item[]>([]);
    const [potions, setPotions] = useState<Potion[]>([]);
    const [collectableItems, setCollectableItems] = useState<CollectableItem[]>([]);

    // Global variables stored in context
    const eqCtx = useContext(EquipmentContext);
    const userCtx = useContext(UserContext);

    // Hook for making API requests
    const sendRequest = useHttp<EquipmentResponseObject[]>('api/equipment', 'GET', undefined, userCtx.user!.authToken);
    const sendRequest2 = useHttp<InventoryResponseObject>('api/inventory/', "GET", undefined, userCtx.user?.authToken);

    // Prevent sending requests if true
    const [requestLock, setRequestLock] = useState(false);
    // Store slot which item will be replaced (will be used in api request)
    const [slotToReplace, setSlotToReplace] = useState<ItemType>();

    // Get item value from response object and set it into eq
    const setItemsIntoEq = (eqArr: EquipmentResponseObject[]) => {
        const tmpEq = equipment;
        // Search for item slot
        eqArr.forEach(slotItem => {
            tmpEq[slotItem.slot] = slotItem.item ? slotItem.item : undefined;
        });

        eqCtx.setEquipment(tmpEq);
        setEquipment((prevEq) => ({
            ...prevEq,
            weapon: tmpEq.weapon,
            helmet: tmpEq.helmet,
            armor: tmpEq.armor,
            boots: tmpEq.boots,
            trousers: tmpEq.trousers,
            gloves: tmpEq.gloves
        }));
    }

    // Fn will be used as prop in other component
    // Set item that will be set into Eq slot
    const setItemIntoEq = (item: Item) => {
        setItemToReplaceWith(item);
        setSlotToReplace(item.itemType);
        eqCtx.setItem(item);
        setEquipment((prevEq)=> ({
            ...prevEq,
            [item.itemType]: item
        }));
        setEqChanged((prevState) => !prevState);
    }

    // Remove item from user's equipment
    // Replace that item with item provided as argument
    const removeItemFromEq = (item: ItemType) => {
        setItemToReplaceWith(null);
        setSlotToReplace(item);
        eqCtx.removeItem(item);
        setEquipment((prevEq) => ({
            ...prevEq,
            [item]: undefined
        }));
        setEqChanged((prevState) => !prevState);
    }

    // Remove item from user's equipment
    // Add this item into user's inventory
    const replaceItemHandler = (item: Item) => {
        removeItemFromEq(item.itemType);
        addUserItemHandler(item);
    }

    // Get Equipment data from the server
    const getEqData = async () => {
        const {data, code} = await sendRequest();
        if (code === 200) {
            setItemsIntoEq(data);
        }
    }

    // Get user inventory from the server
    const getUserItems = async () => {
        const {data, code} = await sendRequest2('api/inventory/', "GET");
        if (code === 200) {
            const responseItems = data.items.map((item) => item.item);
            const responseCollectables = data.collectableItems.map(el => el.collectableItem)
            const responsePotions = data.potions.map(el => el.potion);
            setCollectableItems(responseCollectables);
            setPotions(responsePotions);
            setItems(responseItems);
        }
        else {
            console.log(data);
        }
    };

    // Send Replace Item request
    const replaceItemRequest = async () => {
        const idOrNull = itemToReplaceWith ? itemToReplaceWith.id : null;
        const {data, code} = await sendRequest(`api/equipment/${slotToReplace}/replace_item/`, 'PATCH', {'item': idOrNull});
        if (code === 200) {
            //console.log('Pozytywna odp')
        } else {
            console.log(data);
        }
    }

    const compareItemStatsHandler = (item: Item) => {
        setItemToCompare(item);
    }

    const removeComparedStatsHandler = () => {
        setItemToCompare(undefined);
    }

    // Add item into inventory
    const addUserItemHandler = (item: Item | CollectableItem | Potion) => {
        // Check type of the item
        if ('itemType' in item) {
            let tmpArr = items.slice();
            tmpArr.push(item);
            setItems(tmpArr);
        }
        else if ('hpValue' in item) {
            let tmpArr = potions.slice();
            tmpArr.push(item);
            setPotions(tmpArr);
        }
        else {
            let tmpArr = collectableItems.slice();
            tmpArr.push(item);
            setCollectableItems(tmpArr);
        }
    };

    // Remove item from inventory
    const removeUserItemHandler = (item: Item | CollectableItem | Potion) => {
        // Check type of the item
        if ('itemType' in item) {
            let tmpArr = items.slice();
            const index = tmpArr.findIndex(el => el.id === item.id);
            tmpArr.splice(index, 1);
            setItems(tmpArr);
        }
        else if ('hpValue' in item) {
            let tmpArr = potions.slice();
            const index = tmpArr.findIndex(el => el.id === item.id);
            tmpArr.splice(index, 1);
            setPotions(tmpArr);
        }
        else {
            let tmpArr = collectableItems.slice();
            const index = tmpArr.findIndex(el => el.id === item.id);
            tmpArr.splice(index, 1);
            setCollectableItems(tmpArr);
        }
    }

    // Button fn triggered on click
    const buttonOnClick = (item: Item) => {
        setItemIntoEq(item);
        removeUserItemHandler(item);
    }

    const userButtons: ButtonController[] = [
        {
            onClick: buttonOnClick,
            text: 'ZAŁÓŻ'
        }
    ]

    useEffect(() => {
        // Send request if equipment has changed
        if (prevEquipmentRef.current !== eqChanged) {
            console.log('Zmieniono przedmiot');
            replaceItemRequest();
            setUpdateStats((prevStats) => !prevStats);
        }

        // Send request at first render
        if (!requestLock) {
            getEqData();
            getUserItems();
            setRequestLock(true);
            setUpdateStats((prevStats) => !prevStats);
        }
        
        // Track equipment change
        prevEquipmentRef.current = eqChanged;
    }, [equipment, eqChanged]);

    return <div className="equipment">
            <div className="equipment-character">     
                <CharacterStatsContainer statsHasChanged={updateStats} itemToCompare={itemToCompare}/>
                <EquipmentItemsContainer equipment={equipment} replaceItemHandler={replaceItemHandler}/>
            </div>
            <div className="user-items">
                <UserItemContainer items={items} potions={potions} collectableItems={collectableItems} buttons={userButtons} onHoverHandler={compareItemStatsHandler} onMouseLeaveHandler={removeComparedStatsHandler}/>
            </div>
        </div>
};

export default Equipment;