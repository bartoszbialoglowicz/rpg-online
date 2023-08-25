import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Store as StoreType, StoreItem, StorePotion, StoreCollectableItem, ItemStatsValues, Item } from "../../utils/types";
import { AppSettings, InterfaceSettings } from "../../utils/settings";
import CharacterStatsContainer from "../Character/CharacterStatsContainer";

type responseType = {
    items: StoreItem[],
    potions: StorePotion[],
    collectableItems: StoreCollectableItem[]
}

const Store: React.FC<{store: StoreType}> = (props) => {
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<responseType>(`api/store/${props.store.id}/`, 'GET', undefined, userCtx.user?.authToken);

    const [items, setItems] = useState<(StoreItem | undefined)[]>([]);
    const [itemToCompare, setItemToCompare] = useState<Item>();

    // Add empty slots into array
    const addEmptySlots = (itemsArr: (StoreItem | undefined)[]) => {
        const emptySlots = AppSettings.SHOP_ITEMS_LIMIT - itemsArr.length;
        const newArray = itemsArr.slice();
        if (emptySlots > 0) {
            for (let i = 0; i < emptySlots; i++) {
                newArray.push(undefined);
            }
        }

        return newArray;
    }

    const getData = async () => {
        const {data, code} = await sendRequest();
        if (code === 200) {
            setItems(addEmptySlots(data.items));
        }
        else {
            console.log(data);
        }
    };

    useEffect(()=> {
        getData();
    }, []);

    const itemsJSX = items.map((el, index)=> {
        let itemJSX = <div key={index}>EMPTY</div>
        if (el) {
            itemJSX = <div key={index} onMouseOver={()=>setItemToCompare(el.item)}>{el.item.name}</div>
        }
        return itemJSX;
    });

    return <div className="store-list-shop">
        <CharacterStatsContainer itemToCompare={itemToCompare}/>
        <div className="store-list-shop-items-container">
            {itemsJSX}
        </div>
    </div>
};

export default Store;