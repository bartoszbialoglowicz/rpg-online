import React from "react";
import { Store } from "../../types/StoreTypes";

import './AvailableStoreList.css';
import Card from "../UI/Card";

const AvailableStoreList: React.FC<{stores: Store[], setStore: (store: Store) => void}> = (props) => {
    
    const storesListJSX = props.stores.length > 0 ? props.stores.map((store: Store) => {
        return <Card>
            <div className="store-container-store-list-option" key={store.id} onClick={() => props.setStore(store)}>
                <img src={store.npc.imageUrl} alt={store.npc.name} />
            </div>
            </Card>
    }) : <p>Brak sklepów w obecnej lokalizacji</p>

    return <div className="store-container-store-list">
        {storesListJSX}
    </div>
};

export default AvailableStoreList;