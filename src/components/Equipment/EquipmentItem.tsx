import { useState } from "react";
import { Item } from "../../utils/types";

import './EquipmentItem.css';

const EquipmentItem: React.FC<Item> = (props) => {

    const [isHidden, setIsHidden] = useState(true);

    const getPositiveValue = (value: number) => {
        return value > 0 ? true : false;
    }

    const onMouseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setTimeout(() => setIsHidden((prevState: boolean) => !prevState), 200);
    }
    const hiddenClass = isHidden ? 'hidden' : '';

    return <div className="equipment-container-item" onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
        <p>{props.name}</p>
        <p>{props.itemType}</p>
        <div className={`${hiddenClass} equipment-container-item-stats`} >
            {getPositiveValue(props.armor) && <p>{`Armor: ${props.armor}`}</p>}
            {getPositiveValue(props.magicResist) && <p>{`Magic resists: ${props.magicResist}`}</p>}
            {getPositiveValue(props.damage) && <p>{`Damage: ${props.damage}`}</p>}
            {getPositiveValue(props.health) && <p>{`Health: ${props.health}`}</p>}
        </div>
    </div>
};

export default EquipmentItem;
