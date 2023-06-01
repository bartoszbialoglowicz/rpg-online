import { useState } from "react";
import { Potion } from "../../utils/types";

import './EquipmentItem.css';
import ItemStats from "../UI/ItemStats";

const EquipmentPotion: React.FC<Potion> = (props) => {

    const [isHidden, setIsHidden] = useState(true);

    const onMouseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => setIsHidden((prevState: boolean) => !prevState), 200);
    }

    return <div className="equipment-container-item" onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
        <p>{props.name}</p>
        <p>Potion</p>
        <ItemStats
            hpValue={props.hpValue}
            goldValue={props.goldValue}
            hidden={isHidden}/>
    </div>
};

export default EquipmentPotion;