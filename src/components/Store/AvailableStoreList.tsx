import React from "react";
import { Store } from "../../types/StoreTypes";

import './AvailableStoreList.css';

const AvailableStoreList: React.FC<{stores: Store[], setStore: (store: Store) => void}> = (props) => {
    
    const storesListJSX = props.stores.length > 0 ? props.stores.map((store: Store) => {
        return <div className="store-container-store-list-option" key={store.id} onClick={() => props.setStore(store)}>
            <p>{`${store.name} (${store.type})`}</p>
        </div>
    }) : <p>Brak sklepów w obecnej lokalizacji</p>

    return <div className="store-container-store-list">
        {storesListJSX}
    </div>
};

export default AvailableStoreList;