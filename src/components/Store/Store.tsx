import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Store as StoreType, StoreItem, StorePotion, StoreCollectableItem, Item, ButtonController, Potion, CollectableItem, InventoryResponseObject, InventoryItem, InventoryPotion, InventoryCollectableItem, responseObject } from "../../utils/types";
import './Store.css';
import StoreItemsContainer from "./StoreItemsContainer";
import UserItemContainer from "../Equipment/UserItemContainer";
import TransactionContainer from "./TranscationContainer";

type responseType = {
    items: StoreItem[],
    potions: StorePotion[],
    collectableItems: StoreCollectableItem[]
}

const Store: React.FC<{store: StoreType}> = (props) => {
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<responseType>(`api/store/${props.store.id}/`, 'GET', undefined, userCtx.user?.authToken);
    const sendRequest2 = useHttp<InventoryResponseObject>('api/inventory/', "GET", undefined, userCtx.user?.authToken);
    const sendRequest3 = useHttp('api/transaction/', 'POST', undefined, userCtx.user?.authToken);

    // Store Items displayed in shop
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
    
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [potions, setPotions] = useState<InventoryPotion[]>([]);
    const [collectableItems, setCollectableItems] = useState<InventoryCollectableItem[]>([]);
    // Current items user going to buy
    const [transactionItemsBuy, setTransactionItemsBuy] = useState<StoreItem[][]>([]);
    // Current items user going to sell
    const [transactionItemsSell, setTransactionItemsSell] = useState<StoreItem[][]>([]);

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

    // Remove item from inventory
    const removeItemHandler = (item: Item | CollectableItem | Potion) => {
        if ('itemType' in item) {
            let tmpArr = items.slice();
            console.log(userItems);
            tmpArr = tmpArr.filter(el => el.item.id !== item.id);
            setItems(tmpArr);
        }
        else if ('hpValue' in item) {
            let tmpArr = potions.slice();
            tmpArr = tmpArr.filter(el => el.potion.id !== item.id);
            setPotions(tmpArr);
        }
        else {
            let tmpArr = collectableItems.slice();
            tmpArr = tmpArr.filter(el => el.collectableItem.id !== item.id);
            setCollectableItems(tmpArr);
        }
    }


    const getUserItems = async () => {
        const {data, code} = await sendRequest2();
        if (code === 200) {
            setCollectableItems(data.collectableItems);
            setPotions(data.potions);
            setItems(data.items);
        }
        else {
            console.log(data);
        }
    };

    // Add user item into transaction list
    const addUserItemIntoTransactionHandler = (item: Item) => {
        console.log(items);
        const index = items.find(el => el.item.id === item.id)!.id;
        const storeItem: StoreItem = {item: item, price: item.goldValue, id: index, store: props.store};
        addItemToTransactionHandler(storeItem, true);
    }

    // Clear transaction items list
    // Function invoked after transaction is finished
    const clearTransactionItems = () => {
        setTransactionItemsBuy([]);
        setTransactionItemsSell([]);
    };

    const getTransactionItemsIds = () => {
        const sellIds: number[] = [];
        const buyIds: number[] = [];
        transactionItemsSell.forEach(arr => {
            arr.forEach(el => {
                sellIds.push(el.id);
            });
        });
        transactionItemsBuy.forEach(arr => {
            arr.forEach(el => {
                buyIds.push(el.id);
            });
        });

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

        console.log(code, data);
    }

    const processTransactionHandler = () => {
        const {buyIds, sellIds} = getTransactionItemsIds();
        getTransactionResponse(buyIds, sellIds);
        clearTransactionItems();
    }

    useEffect(()=> {
        getStoreData();
        getUserItems();
    }, []);

    const addItemToTransactionHandler = (storeItem: StoreItem, isUserItem?: boolean) => {
        let currTransaction = transactionItemsBuy.slice();
        if (isUserItem) {
            currTransaction = transactionItemsSell.slice();
        }
        const index = currTransaction.findIndex(arr => arr[0].id === storeItem.id);
        if (index !== -1) {
            currTransaction[index].push(storeItem);
        } else {
            currTransaction.push([storeItem]);
        }

        if(isUserItem) {
            setTransactionItemsSell(currTransaction);
            console.log(transactionItemsSell);
        }
            
        else {
            setTransactionItemsBuy(currTransaction);
        }
    }

    const buttonOnClick = (item: Item) => {
        addUserItemIntoTransactionHandler(item);
        removeItemHandler(item);
    }

    const userButtons: ButtonController[] = [
        {
            onClick: buttonOnClick,
            text: 'SPRZEDAJ'
        }
    ];

    const userItems = items.map(el => el.item);
    const userPotions = potions.map(el => el.potion);
    const userCollectableItems = collectableItems.map(el => el.collectableItem);

    return <div className="store-list-shop">
        <UserItemContainer buttons={userButtons} items={userItems} potions={userPotions} collectableItems={userCollectableItems}/>
        <TransactionContainer transactionItemsBuy={transactionItemsBuy} transactionItemsSell={transactionItemsSell} finishTransactionHandler={processTransactionHandler}/>
        <StoreItemsContainer storeItems={storeItems} addTransactionItemHandler={addItemToTransactionHandler}/>
    </div>
};

export default Store;