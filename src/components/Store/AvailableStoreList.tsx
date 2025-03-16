import React, { useContext } from "react";
import { Store } from "../../types/StoreTypes";

import './AvailableStoreList.css';
import Card from "../UI/Card";
import { GameContext } from "../../store/game-context";

const AvailableStoreList: React.FC<{stores: Store[], setStore: (store: Store) => void}> = (props) => {
    
    const gameCtx = useContext(GameContext);

    const storesListJSX = props.stores.length > 0 ? props.stores.map((store: Store) => {
        return <Card>
            <div className="store-container-store-list-option" key={store.id} onClick={() => props.setStore(store)}>
                <img src={store.npc.imageUrl} alt={store.npc.name} />
            </div>
            </Card>
    }) : <div className="store-container-store-list-empty">Brak sklepów w pobliżu
        <img src={gameCtx.userLocation.location.imageUrl} />
    </div>;

    return <div className="store-container-store-list">
        {storesListJSX}
    </div>
};

export default AvailableStoreList;