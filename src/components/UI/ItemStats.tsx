import React from "react";
import { ItemStatsValues } from "../../utils/types";

import './ItemStats.css';
import { camelCaseToText } from "../../utils/string-modifiers";

const ItemStats:React.FC<ItemStatsValues> = (props) => {

    const getPositiveValue = (value: number) => {
        // Check if provided valu
        return value > 0 ? true : false;
    }

    const setPropsJSX = () => {
        const propsCopy = props;
        const jsx = Object.entries(propsCopy).filter((el) => el[0] !== 'hidden').map((el, index) => {
            if (typeof el[1] === "number") {
                return  getPositiveValue(el[1]) ? <p key={index}>{`${camelCaseToText(el[0])}: ${el[1]}`}</p> : null;
            }
            return null;
        });
        return jsx;
    }
    const hiddenClass = props.hidden ? 'hidden' : '';

    return <div className={`item-stats ${hiddenClass}`} >
            {setPropsJSX()}
        </div>
};

export default ItemStats;