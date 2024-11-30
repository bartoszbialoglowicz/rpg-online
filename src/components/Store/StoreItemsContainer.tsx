import { Item } from '../../types/ItemTypes';
import { StoreItem } from '../../types/StoreTypes';
import { ButtonController } from '../../utils/types';
import ItemContainer from '../Inventory/ItemContainer';

import './StoreItemsContainer.css';

const StoreItemsContainer: React.FC<{storeItems: StoreItem[], addTransactionItemHandler: (item: StoreItem) => void}> = (props) => {

    const itemsList: Item[] = props.storeItems.map(el => {
        return {...el.item}
    });

    const getItemHandler = (item: Item) => {
        const tmpItem = props.storeItems.find(el => el.item.id === item.id);
        if (tmpItem)
            props.addTransactionItemHandler(tmpItem);
    }

    const itemsJSX = itemsList.map(el => {
        const button: ButtonController = {onClick: () => {getItemHandler(el)}, text:"KUP"}
        return <ItemContainer item={el}/>
    })

    return <div className="store-items-container">
        {itemsJSX}
    </div>
};

export default StoreItemsContainer;