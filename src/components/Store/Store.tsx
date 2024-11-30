import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Potion, CollectableItem, InventoryPotion, InventoryCollectableItem, InventoryItem } from "../../types/ItemTypes";
import { Store as StoreType, StoreItem, StorePotion, StoreCollectableItem, } from "../../types/StoreTypes";
import './Store.css';
import { ButtonController } from "../../utils/types";
import StoreItemsContainer from "./StoreItemsContainer";
import TransactionContainer from "./TranscationContainer";
import { GameContext } from "../../store/game-context";
import { InventoryContext } from "../../store/inventory-context";
import { Item } from "../../types/ItemTypes";

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
    const [transactionItemsBuy, setTransactionItemsBuy] = useState<StoreItem[][]>([]);
    // Current items user going to sell
    const [transactionItemsSell, setTransactionItemsSell] = useState<StoreItem[][]>([]);

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

        return code;
    }

    const processTransactionHandler = async (totalAmount: number) => {
        const {buyIds, sellIds} = getTransactionItemsIds();
        const code = await getTransactionResponse(buyIds, sellIds);
        if (code === 201) {
            console.log(code);
            gameCtx.updateResources(totalAmount);
            setTotalAmount(0);
            clearTransactionItems();
        }
    }

    useEffect(()=> {
        getStoreData();
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
        inventoryCtx.removeFromInventory(item);
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
        <TransactionContainer transactionItemsBuy={transactionItemsBuy} transactionItemsSell={transactionItemsSell} finishTransactionHandler={processTransactionHandler}/>
        <StoreItemsContainer storeItems={storeItems} addTransactionItemHandler={addItemToTransactionHandler}/>
    </div>
};

export default Store;