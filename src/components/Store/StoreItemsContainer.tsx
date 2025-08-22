import type { Item } from "../../types/ItemTypes";
import type { StoreItem } from "../../types/StoreTypes";
import ItemContainer from '../Inventory/ItemContainer';

import './StoreItemsContainer.css';

const StoreItemsContainer: React.FC<{storeItems: StoreItem[], addTransactionItemHandler: (item: StoreItem) => void}> = (props) => {

    const itemsList: Item[] = props.storeItems.map(el => {
        return {...el.item}
    });

    const itemsJSX = itemsList.map(el => {
        return <ItemContainer item={el}/>
    })

    return <div className="store-items-container">
        {itemsJSX}
    </div>
};

export default StoreItemsContainer;