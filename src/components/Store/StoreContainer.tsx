import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/game-context";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Store } from "../../utils/types";
import StoreContainerItem from "./StoreContainerItem";
import AvailableStoreList from "./AvailableStoreList";

const StoreContainer = () => {

    const [stores, setStores] = useState<Store[]>([]);
    const gameCtx = useContext(GameContext);
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<Store[]>('api/store', 'GET', undefined, userCtx.user!.authToken);


    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();

            if (code === 200) {
                setStores(data);
            } else if (code === 401) {
                userCtx.logout();
            }
        };
        getData();
    }, []);
 
    const storesJSX = stores.map((store: Store) => <StoreContainerItem name={store.name} type={store.type} location={store.location} id={store.id} key={store.id}/>);

    return <div className="store-container">
        {storesJSX.length > 0 && <AvailableStoreList storeNames={stores}/>}
        {storesJSX.length === 0 && <p>No available stores for this location</p>}
    </div>
};

export default StoreContainer;