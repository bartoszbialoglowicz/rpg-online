import React from "react";
import { Store } from "../../utils/types";

import './AvailableStoreList.css';

const AvailableStoreList: React.FC<{storeNames: Store[]}> = (props) => {
    const storesListJSX = props.storeNames.map((store: Store) => {
        return <div className="store-container-store-list-option" key={store.id}>
            <p>{`${store.name} (${store.type})`}</p>
        </div>
    })

    return <div className="store-container-store-list">
        {storesListJSX}
    </div>
};

export default AvailableStoreList;