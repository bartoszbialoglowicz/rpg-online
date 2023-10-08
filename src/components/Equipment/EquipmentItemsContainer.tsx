import { useEffect, useState } from "react";
import { ButtonController, Equipment, Item, ItemType } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";

import './EquipmentItemsContainer.css';
import CharacterStatsTitle from "../Character/CharacterStatsTitle";

const EquipmentItemsContainer: React.FC<{equipment: Equipment, replaceItemHandler: (item: Item) => void}> = (props) => {

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
            items.forEach((item: Item) => {
                if (item !== undefined && item.itemType === el) {
                    const button: ButtonController = {onClick: () => {props.replaceItemHandler(item)}, text: "ZDEJMIJ"};
                    tmpJsxEl = <div key={index} className="equipment-container-row">
                    <EquipmentItem item={item} buttons={[button]}/>
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
    }, [props.equipment]);

    return <div className="equipment-container">
        <CharacterStatsTitle title='ekwipunek' />
        {equippedItems}
    </div>
};

export default EquipmentItemsContainer;