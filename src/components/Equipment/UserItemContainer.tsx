import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { InventoryResponseObject, Item, UserItemsResponseObject } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";

const UserItemContainer = () => {

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<InventoryResponseObject>('api/inventory/', "GET", undefined, userCtx.user?.authToken);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const getItems = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                const responseItems = data.items.map((item) => item.item);
                setItems(responseItems);
            }
            else {
                console.log(data);
            }
        };

        getItems();
    }, []);

    const itemsJsx = items.map((item: Item, index: number) => {
        return <EquipmentItem name={item.name} itemType={item.itemType} armor={item.armor} magicResist={item.magicResist} damage={item.damage} health={item.health} key={index}/>
    })

    return <div className="user-items-container">
        {itemsJsx}
    </div>
};

export default UserItemContainer;