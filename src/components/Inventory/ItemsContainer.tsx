import { useContext } from "react";
import { InventoryContext } from "../../store/inventory-context";
import ItemContainer from "./ItemContainer";

import './ItemsContainer.css';
import { StatsContext } from "../../store/stats-context";
import ItemsGrid from "../UI/ItemsGrid";

const ItemsContainer = () => {

    const inventoryCtx = useContext(InventoryContext);
    const statsCtx = useContext(StatsContext);

    const items = inventoryCtx.inventory.items.map((item) => {
        const equippedItem = inventoryCtx.equipment[item.item.itemType]?.item || undefined;

        return (
            <ItemContainer
                item={item.item}
                key={item.id}
                onClick={() => statsCtx.compareStats(item.item, equippedItem)}
            />
        );
    });


    return <div className="items-container">
        <ItemsGrid children={items} gridItemsCount={40} />
    </div>
};

export default ItemsContainer;