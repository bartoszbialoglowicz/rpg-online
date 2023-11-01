import React from "react";
import { Store } from "../../utils/types";

import './AvailableStoreList.css';

const AvailableStoreList: React.FC<{stores: Store[], setStore: (store: Store) => void}> = (props) => {
    
    const storesListJSX = props.stores.length > 0 ? props.stores.map((store: Store) => {
        return <div className="store-container-store-list-option" key={store.id} onClick={() => props.setStore(store)}>
            <p>{`${store.name} (${store.type})`}</p>
            <div className="store-container-shopkeeper">
                <div className="store-container-shopkeeper-image">
                    <img src={store.npc.imageUrl} alt={store.npc.name} />
                </div>
                <div className="store-container-shopkeeper-name">
                    <h2>{store.npc.name}</h2>
                    <h3>{store.type}</h3>
                </div>
            </div>
        </div>
    }) : <p>Brak sklepów w obecnej lokalizacji</p>

    return <div className="store-container-store-list">
        {storesListJSX}
    </div>
};

export default AvailableStoreList;