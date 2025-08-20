import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import type { Store as StoreType } from "../../types/StoreTypes";
import Store from "./Store";
import AvailableStoreList from "./AvailableStoreList";

const StoreContainer = () => {

    const [stores, setStores] = useState<StoreType[]>([]);
    const [currentStore, setCurrentStore] = useState<JSX.Element | undefined>();
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<StoreType[]>('api/store', 'GET', undefined, userCtx.user!.authToken);

    const setStoreHandler = (store: StoreType) => {
        setCurrentStore(<Store store={store}/>);
    }

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

    const JSXItem = currentStore ? currentStore : <AvailableStoreList stores={stores} setStore={setStoreHandler}/>


    return <div className="store-container">
        {JSXItem}
    </div>
};

export default StoreContainer;