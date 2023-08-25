import { Item, ItemStatsValues, ItemType } from "../../utils/types";

import './EquipmentItem.css';
import ItemStats from "../UI/ItemStats";
import slot from '../../assets/images/empty_slot.jpg.png';


type Props = {
    item?: Item, 
    removeItemHandler?: (slot: ItemType) => void, 
    itemType?: string,
    addItemHandler?: (item: Item) => void,
    onHoverHandler?: (item: Item) => void,
    onMouseLeaveHandler?: () => void
}

const EquipmentItem: React.FC<Props> = (props) => {

    const itemStatsJSX = props.item ? <ItemStats stats={props.item}/> : <ItemStats itemType={props.itemType ? props.itemType : undefined}/>;
    
    const onClickHandler = () => {
        if (props.removeItemHandler && props.item) {
            props.removeItemHandler(props.item.itemType);
        }
        if (props.addItemHandler && props.item) {
            props.addItemHandler(props.item);
        }
    }

    const onHoverHandler = () => {
        if (props.onHoverHandler && props.item) {
            props.onHoverHandler(props.item);
        }
    }

    const onMouseLeaveHandler = () => {
        if (props.onHoverHandler && props.onMouseLeaveHandler) {
            props.onMouseLeaveHandler();
        }
    }

    const backdropJSX = props.item && (props.removeItemHandler || props.addItemHandler) ? <div className="equipment-container-item-stats-backdrop" onMouseOver={onHoverHandler} onMouseLeave={onMouseLeaveHandler}>
        <button onClick={onClickHandler}>{props.removeItemHandler ? 'ZDEJMIJ' : 'ZAŁÓŻ'}</button>
        <button>PORÓWNAJ</button>
    </div> : null;

    return <div className="equipment-container-item">
            <div className="equipment-container-item-image">
                <img src={props.item ? props.item.imageUrl : slot} alt={props.item ? props.item.name : 'Empty slot'} />
            </div>
            <div className="equipment-container-item-stats">
                {backdropJSX}
                {itemStatsJSX}
        </div>
    </div>
};

export default EquipmentItem;
