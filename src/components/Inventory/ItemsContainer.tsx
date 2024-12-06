import { useContext } from "react";
import { InventoryContext } from "../../store/inventory-context";
import ItemContainer from "./ItemContainer";

import './ItemsContainer.css';
const ItemsContainer = () => {

    const inventoryCtx = useContext(InventoryContext);

    const items = inventoryCtx.inventory.items.map(item =>
        <ItemContainer item={item.item} key={item.id} onClick={inventoryCtx.replaceEquipmentItem}/>
    );

    const nums: number[] = [...Array(40-inventoryCtx.inventory.items.length)];

    const it = nums.map(el => <div className="item-container empty" />)

    return <div className="items-container">
        {items}
        {it}
    </div>
};

export default ItemsContainer;