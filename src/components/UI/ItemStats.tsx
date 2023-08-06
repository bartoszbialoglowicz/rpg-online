import React from "react";
import { ItemStatsValues } from "../../utils/types";

import './ItemStats.css';

const ItemStats:React.FC<ItemStatsValues> = (props) => {

    return <div className="item-stats">
            <div className="item-stats-row">
                <div className="item-stats-column">
                    <div className="item-stats-cell">{props.name}</div>
                </div>
            </div>
            <div className="item-stats-row">
                <div className="item-stats-column">
                    <div className="item-stats-cell">Damage: {props.damage}</div>
                    <div className="item-stats-cell">Health: {props.health}</div>
                </div>
                <div className="item-stats-column">
                    <div className="item-stats-cell">Armor: {props.armor}</div>
                    <div className="item-stats-cell">Magic resist: {props.magicResist}</div>
                </div>
            </div>
            <div className="item-stats-row">
                <div className="item-stats-column">
                    <div className="item-stats-cell">Gold value: {props.goldValue}</div>
                    <div className="item-stats-cell"></div>
                </div>
            </div>
        </div>
};

export default ItemStats;