import { ButtonController, Item, StoreItem } from "../../utils/types";
import CharacterStatsTitle from "../Character/CharacterStatsTitle";
import EquipmentItem from "../Equipment/EquipmentItem";

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
        return <EquipmentItem item={el} key={el.id} buttons={[button]}/>
    })

    return <div className="store-items-container">
        <CharacterStatsTitle title="shop items"/>
        {itemsJSX}
    </div>
};

export default StoreItemsContainer;