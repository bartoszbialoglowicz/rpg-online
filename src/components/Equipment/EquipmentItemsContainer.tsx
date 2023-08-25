import { useContext, useEffect, useRef, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Equipment, EquipmentResponseObject, Item, ItemType } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";

import './EquipmentItemsContainer.css';
import CharacterStatsTitle from "../Character/CharacterStatsTitle";

const EquipmentItemsContainer: React.FC<{equipment: Equipment, replaceItemHandler: (item: ItemType) => void}> = (props) => {

    const [equippedItems, setEquippedItems] = useState<JSX.Element[]>([]);

    // Iterate over all slots, then return an JSX Element
    // Return EquipmentItem component with values if slot is not empty
    // Return EquipmentItem component witout props if slot is empty
    // Returned JSX will be used as returned value from this current component
    const setItemsJSX = (items: Item[]) => {
        const tmpJSX: JSX.Element[] = [];
        const types: ItemType[] = ['helmet', 'weapon', 'armor', 'gloves', 'trousers', 'boots'];
        types.forEach((el: string, index: number) => {
            let tmpJsxEl = <div key={index} className="equipment-container-row">
                <EquipmentItem itemType={el}/>
            </div>;
            const tmpItems = items.map((itemOrBlank: Item | undefined) => {
                if (itemOrBlank !== undefined) {
                    return itemOrBlank;
                }
            })
            tmpItems.forEach((item: Item | undefined) => {
                if (item !== undefined && item.itemType === el) {
                    tmpJsxEl = <div key={index} className="equipment-container-row">
                    <EquipmentItem item={item} removeItemHandler={props.replaceItemHandler}/>
                    </div>;
                }
            });
            tmpJSX.push(tmpJsxEl);
            });
        return tmpJSX;
    }

    useEffect(() => {
        const itemArray = Object.values(props.equipment);
        setEquippedItems(setItemsJSX(itemArray));
        console.log("EquipmentItemsCt useEffect");
    }, [props.equipment]);

    return <div className="equipment-container">
        <CharacterStatsTitle title='ekwipunek' />
        {equippedItems}
    </div>
};

export default EquipmentItemsContainer;