import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import type { InventoryPotion, InventoryCollectableItem, InventoryItem } from "../../types/ItemTypes";
import type { Store as StoreType, StoreItem, StorePotion, StoreCollectableItem } from "../../types/StoreTypes";
import './Store.css';
import TransactionContainer from "./TranscationContainer";
import { GameContext } from "../../store/game-context";
import { InventoryContext } from "../../store/inventory-context";
import type { Item } from "../../types/ItemTypes";
import ItemsGrid from "../UI/ItemsGrid";
import ItemContainer from "../Inventory/ItemContainer";

type responseType = {
    items: StoreItem[],
    potions: StorePotion[],
    collectableItems: StoreCollectableItem[]
}

const Store: React.FC<{store: StoreType}> = (props) => {
    const userCtx = useContext(UserContext);
    const inventoryCtx = useContext(InventoryContext);
    const sendRequest = useHttp<responseType>(`api/store/${props.store.id}/`, 'GET', undefined, userCtx.user?.authToken);;
    const sendRequest3 = useHttp('api/transaction/', 'POST', undefined, userCtx.user?.authToken);

    // Store Items displayed in shop
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

    // Store total amount of transaction
    const [totalAmount, setTotalAmount] = useState(0);
    
    const [items, setItems] = useState<InventoryItem[]>(inventoryCtx.inventory.items);
    const [potions, setPotions] = useState<InventoryPotion[]>(inventoryCtx.inventory.potions);
    const [collectableItems, setCollectableItems] = useState<InventoryCollectableItem[]>(inventoryCtx.inventory.collectableItems);
    // Current items user going to buy
    const [transactionItemsBuy, setTransactionItemsBuy] = useState<StoreItem[]>([]);
    // Current items user going to sell
    const [transactionItemsSell, setTransactionItemsSell] = useState<StoreItem[]>([]);

    const gameCtx = useContext(GameContext);

    const getStoreData = async () => {
        const {data, code} = await sendRequest();

        // How to check the type of data???
        if (code === 200) {
            setStoreItems(data.items);
        }
        else {
            console.log(data);
        }
    };

    // Add user item into transaction list
    const addUserItemIntoTransactionHandler = (item: InventoryItem) => {
        setItems(prevState=>prevState.filter(el => el.id !== item.id));
        const storeItem: StoreItem = {item: item.item, price: item.item.goldValue, id: item.id, store: props.store};
        addItemToTransactionHandler(storeItem, true);
    }

    // Clear transaction items list
    // Function invoked after transaction is finished
    const clearTransactionItems = () => {
        setTransactionItemsBuy([]);
        setTransactionItemsSell([]);
    };

    const getTransactionItemsIds = () => {
        const sellIds = transactionItemsSell.map(el => el.id);
        const buyIds: number[] = transactionItemsBuy.map(el => el.id);

        return {sellIds, buyIds};
    }

    const getTransactionResponse = async (buy: number[], sell: number[]) => {
        const body = {
            'sellItems': sell,
            'buyItems': buy,
            'store': props.store.id,
            'user': userCtx.user?.id
        }
        const {data, code} = await sendRequest3(undefined, undefined, body);

        return {data,code};
    }

    const processTransactionHandler = async (totalAmount: number) => {
        const {buyIds, sellIds} = getTransactionItemsIds();
        const {data,code} = await getTransactionResponse(buyIds, sellIds);
        console.log(data);
        if (code === 201) {
            gameCtx.updateResources(totalAmount);
            inventoryCtx.removeItemsFromInventory(transactionItemsSell.flat().map(item => item.item));
            inventoryCtx.addInventoryItems(transactionItemsBuy.flat().map(item => item.item));
            setTotalAmount(0);
            clearTransactionItems();
        }
    }

    useEffect(()=> {
        getStoreData();
    }, []);

    const addItemToTransactionHandler = (storeItem: StoreItem, isUserItem?: boolean) => {
        if(isUserItem) {
            setTransactionItemsSell((prevState) => [...prevState, storeItem]);
        }
        else {
            setTransactionItemsBuy((prevState) => [...prevState, storeItem]);
        }
    }

    const removeItemFromTransactionHandler = (item: StoreItem, isUserItem: boolean) => {
        if (isUserItem) {
            setTransactionItemsSell((prevState) => prevState.filter(el => el.id !== item.id));
            setItems((prevState) => [...prevState, {item: item.item, id: item.id, user: userCtx.user?.id} as InventoryItem])
        }
        else {
            setTransactionItemsBuy((prevState) => prevState.filter(el => el.id !== item.id));
        }
    }


    const userItems = items.map(el => {return <ItemContainer item={el.item} onClick={() => {addUserItemIntoTransactionHandler(el)}}/>});

    return <div className="store-list-shop">
        <ItemsGrid children={userItems} gridItemsCount={40}/>
        <TransactionContainer transactionItemsBuy={transactionItemsBuy} transactionItemsSell={transactionItemsSell} finishTransactionHandler={processTransactionHandler} removeTranscationItem={removeItemFromTransactionHandler} />
        <ItemsGrid children={storeItems.map(item => <ItemContainer item={item.item} onClick={() => {addItemToTransactionHandler(item, false)}}/>)} gridItemsCount={40} />
    </div>
};

export default Store;