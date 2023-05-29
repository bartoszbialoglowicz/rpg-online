import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Equipment, EquipmentResponseObject, Item, ItemType } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";

import './EquipmentItemsContainer.css';

const EquipmentItemsContainer = () => {
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<EquipmentResponseObject[]>('api/equipment', 'GET', undefined, userCtx.user!.authToken);

    const [equippedItems, setEquippedItems] = useState<JSX.Element[]>([]);
    const [equipment, setEquipment] = useState<Equipment>({});

    // Get item value from response object and set it into eq
    const setItemIntoEq = (eqObj: EquipmentResponseObject) => {
        const tmpEq = equipment;
        tmpEq[eqObj.slot] = eqObj.item;
        setEquipment(tmpEq);
    }

    // Iterate over all slots, then return an JSX Element
    // Return EquipmentItem component with values if slot is not empty
    // Return <p> with information when slot is empty
    // Returned JSX will be used as returned value from this current component
    const setItemsJSX = (items: Item[]) => {
        const tmpJSX: JSX.Element[] = [];
        const types: ItemType[] = ['armor', 'boots', 'gloves', 'helmet', 'helmet', 'trousers', 'weapon'];
        types.forEach((el: string, index: number) => {
            let tmpJsxEl = <p key={index}>{`${el}: Unequipped`}</p>;
            items.forEach((item: Item) => {
                if (item.itemType === el) {
                    tmpJsxEl = <EquipmentItem 
                    itemType={item.itemType} 
                    damage={item.damage}
                    magicResist={item.magicResist}
                    health={item.health}
                    armor={item.armor}
                    name={item.name}
                    key={item.name}
                    />;
                }
                items = items.filter((item: Item) => item.itemType !== el);
            });
            tmpJSX.push(tmpJsxEl);
        });
        return tmpJSX;
    }

    // Get current user's equipment from the API
    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                const tmpItems: Item[] = [];
                data.forEach((eqObj: EquipmentResponseObject) => {
                    setItemIntoEq(eqObj);
                    tmpItems.push(eqObj.item);
                });
                setEquippedItems(setItemsJSX(tmpItems));
            }
        }
        getData();
    }, [])

    return <div className="equipment-container">
        {equippedItems}
    </div>
};

export default EquipmentItemsContainer;