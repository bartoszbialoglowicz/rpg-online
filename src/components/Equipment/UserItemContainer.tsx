import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Item, UserItemsResponseObject } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";

const UserItemContainer = () => {

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<UserItemsResponseObject[]>('api/useritems/', "GET", undefined, userCtx.user?.authToken);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const getItems = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                setItems(data[0].item);
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