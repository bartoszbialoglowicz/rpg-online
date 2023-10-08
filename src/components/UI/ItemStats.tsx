import React from "react";
import { Item } from "../../utils/types";

import './ItemStats.css';

const ItemStats:React.FC<{stats?: Item, itemType?: string}> = (props) => {

    const content = props.stats ? <>
            <div className="item-stats-row">
                <div className="item-stats-column">
                    <div className="item-stats-cell">Damage: {props.stats.damage}</div>
                    <div className="item-stats-cell">Health: {props.stats.health}</div>
                </div>
                <div className="item-stats-column">
                    <div className="item-stats-cell">Armor: {props.stats.armor}</div>
                    <div className="item-stats-cell">Magic resist: {props.stats.magicResist}</div>
                </div>
            </div>
            <div className="item-stats-row">
                <div className="item-stats-column">
                    <div className="item-stats-cell">Gold value: {props.stats.goldValue}</div>
                    <div className="item-stats-cell"></div>
                </div>
            </div>
    </> : <div className="item-stats-empty">
        
    </div>

    return <div className="item-stats">
            {content}
        </div>
};

export default ItemStats;