import { ButtonController, Item } from "../../utils/types";

import './EquipmentItem.css';
import ItemStats from "../UI/ItemStats";
import slot from '../../assets/images/empty_slot.jpg.png';
import Button from "../UI/Button";

type Props = {
    item?: Item, 
    itemType?: string,
    onHoverHandler?: (item: Item) => void,
    onMouseLeaveHandler?: () => void,
    buttons?: ButtonController[]
}

const EquipmentItem: React.FC<Props> = (props) => {

    const itemStatsJSX = props.item ? <ItemStats stats={props.item}/> : <ItemStats itemType={props.itemType ? props.itemType : undefined}/>;

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

    const buttonsJSX = props.buttons ? props.buttons.map((bt, index) => <Button key={index} onClickHandler={() => bt.onClick(props.item)} text={bt.text}/>) : undefined;

    const actionsJSX = props.item && props.buttons ? <div className="equipment-container-item-actions">
        <span>{props.item.name}</span>
        {buttonsJSX}
    </div> : <p>{`EMPTY SLOT [${props.itemType}]`}</p>;

    return <div className={`equipment-container-item`} onMouseOver={onHoverHandler} onMouseLeave={onMouseLeaveHandler}>
            <div className="equipment-container-item-header">
                <div className="equipment-container-item-image">
                    <img src={props.item ? props.item.imageUrl : slot} alt={props.item ? props.item.name : 'Empty slot'} />
                </div>
                {actionsJSX}
            </div>
            <div className="equipment-container-item-stats"> 
                {itemStatsJSX}
        </div>
    </div>
};

export default EquipmentItem;
