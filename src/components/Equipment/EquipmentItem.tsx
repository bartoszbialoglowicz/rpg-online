import { useState } from "react";
import { Item } from "../../utils/types";

import './EquipmentItem.css';
import ItemStats from "../UI/ItemStats";

const EquipmentItem: React.FC<Item> = (props) => {

    const [isHidden, setIsHidden] = useState(true);

    const onMouseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => setIsHidden((prevState: boolean) => !prevState), 200);
    }
    
    return <div className="equipment-container-item" onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
        <p>{props.name}</p>
        <p>{props.itemType}</p>
        <ItemStats 
            armor={props.armor}
            damage={props.damage}
            health={props.health}
            magicResist={props.magicResist}
            hidden={isHidden}/>
    </div>
};

export default EquipmentItem;
