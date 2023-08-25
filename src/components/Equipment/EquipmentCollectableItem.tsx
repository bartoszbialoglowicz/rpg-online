import { CollectableItem } from "../../utils/types";

const EquipmentCollectableItem: React.FC<CollectableItem> = (props) => {
    return <div className="equipment-container-item">
        <p>{props.name}</p>
        <p>Item</p>
        <p>{`Wartość: ${props.goldValue}`}</p>
    </div>
};

export default EquipmentCollectableItem;