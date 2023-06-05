import { useState } from "react";
import { CollectableItem } from "../../utils/types";
import ItemStats from "../UI/ItemStats";

const EquipmentCollectableItem: React.FC<CollectableItem> = (props) => {
    const [isHidden, setIsHidden] = useState(true);

    const onMouseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => setIsHidden((prevState: boolean) => !prevState), 200);
    }
    
    return <div className="equipment-container-item" onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
        <p>{props.name}</p>
        <p>Item</p>
        <ItemStats
            goldValue={props.goldValue}
            hidden={isHidden}/>
    </div>
};

export default EquipmentCollectableItem;