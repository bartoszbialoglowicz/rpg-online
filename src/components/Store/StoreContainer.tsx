import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/game-context";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Store } from "../../utils/types";
import StoreContainerItem from "./StoreContainerItem";

const StoreContainer = () => {

    const [stores, setStores] = useState<Store[]>([]);
    const gameCtx = useContext(GameContext);
    const token = useContext(UserContext).user!.authToken;
    const sendRequest = useHttp<Store[]>('api/store', 'GET', undefined, token);


    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();

            if (code === 200) {
                setStores(data);
            }
        };
        getData();
    });
 
    const storesJSX = stores.map((store: Store) => <StoreContainerItem name={store.name} type={store.type} location={store.location} id={store.id} key={store.id}/>);

    return <div className="store-container">
        {storesJSX}
    </div>
};

export default StoreContainer;