import CharacterStatsContainer from "../Character/CharacterStatsContainer";
import EquipmentItemsContainer from "./EquipmentItemsContainer";
import UserItemContainer from "./UserItemContainer";

import './Equipment.css';
import { useContext, useEffect, useRef, useState } from "react";
import { EquipmentResponseObject, Item, Equipment as EquipmentType, ItemType, ItemStatsValues } from "../../utils/types";
import { UserContext } from "../../store/user-context";
import { useHttp } from "../../hooks/use-http";
import EquipmentContextProvider, { EquipmentContext } from "../../store/equipment-context";

const Equipment = () => {
    // Store bool for Equipment change signal
    const [eqChanged, setEqChanged] = useState(false);
    // Store item that will be replacing the other one in user Eq
    const [itemToReplaceWith, setItemToReplaceWith] = useState<Item | null>();
    // Store bool which makes signal to update Stats component
    const [updateStats, setUpdateStats] = useState(false);
    // Store stats difference between items
    const [itemToCompare, setItemToCompare] = useState<Item>();

    const eqCtx = useContext(EquipmentContext);
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<EquipmentResponseObject[]>('api/equipment', 'GET', undefined, userCtx.user!.authToken);

    const [equipment, setEquipment] = useState<EquipmentType>({});
    const prevEquipmentRef = useRef(eqChanged);

    // Prevent sending requests if true
    const [requestLock, setRequestLock] = useState(false);
    // Store slot which item will be replaced (will be used in api request)
    const [slotToReplace, setSlotToReplace] = useState<ItemType>();

    // Get item value from response object and set it into eq
    const setItemsIntoEq = (eqArr: EquipmentResponseObject[]) => {
        const tmpEq = equipment;
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

    // Get Equipment data from the server
    const getData = async () => {
        const {data, code} = await sendRequest();
        if (code === 200) {
            setItemsIntoEq(data);
        }
    }

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

    useEffect(() => {
        if (prevEquipmentRef.current !== eqChanged) {
            console.log('Zmieniono przedmiot');
            replaceItemRequest();
            setUpdateStats((prevStats) => !prevStats);
        }

        // Send request at first render
        if (!requestLock) {
            getData();
            setRequestLock(true);
            setUpdateStats((prevStats) => !prevStats);
        }
        
        prevEquipmentRef.current = eqChanged;
    }, [equipment, eqChanged])

    return <div className="equipment">
            <CharacterStatsContainer statsHasChanged={updateStats} itemToCompare={itemToCompare}/>
            <EquipmentItemsContainer equipment={equipment} replaceItemHandler={removeItemFromEq}/>
            <UserItemContainer addItemHandler={setItemIntoEq} onHoverHandler={compareItemStatsHandler} onMouseLeaveHandler={removeComparedStatsHandler}/>
    </div>
};

export default Equipment;