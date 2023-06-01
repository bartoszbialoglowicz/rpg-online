import React from "react";
import { ItemStatsValues } from "../../utils/types";

const ItemStats:React.FC<ItemStatsValues> = (props) => {

    const getPositiveValue = (value: number) => {
        return value > 0 ? true : false;
    }
    const hiddenClass = props.hidden ? 'hidden' : '';
    return <div className={`${hiddenClass} equipment-container-item-stats`} >
            {props.armor && getPositiveValue(props.armor) && <p>{`Armor: ${props.armor}`}</p>}
            {props.magicResist && getPositiveValue(props.magicResist) && <p>{`Magic resists: ${props.magicResist}`}</p>}
            {props.damage && getPositiveValue(props.damage) && <p>{`Damage: ${props.damage}`}</p>}
            {props.health && getPositiveValue(props.health) && <p>{`Health: ${props.health}`}</p>}
        </div>
};

export default ItemStats;