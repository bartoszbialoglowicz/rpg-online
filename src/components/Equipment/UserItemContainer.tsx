import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { InventoryResponseObject, Item, Potion, UserItemsResponseObject } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";
import { CollectableItem } from "../../utils/types";
import EquipmentCollectableItem from "./EquipmentCollectableItem";
import EquipmentPotion from "./EquipmentPotion";

import './UserItemsContainer.css';
import CharacterStatsTitle from "../Character/CharacterStatsTitle";

const UserItemContainer = () => {

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<InventoryResponseObject>('api/inventory/', "GET", undefined, userCtx.user?.authToken);
    const [items, setItems] = useState<Item[]>([]);
    const [potions, setPotions] = useState<Potion[]>([]);
    const [collectableItems, setCollectableItems] = useState<CollectableItem[]>([]);

    useEffect(() => {
        const getItems = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                const responseItems = data.items.map((item) => item.item);
                const responseCollectables = data.collectableItems.map(el => el.collectableItem)
                const responsePotions = data.potions.map(el => el.potion);
                setCollectableItems(responseCollectables);
                setPotions(responsePotions);
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
    });
    const collectableJsx = collectableItems.map((item: CollectableItem) => {
        return <EquipmentCollectableItem name={item.name} goldValue={item.goldValue} id={item.id} key={item.id}/>
    })
    const potionJsx = potions.map((item: Potion) => {
        return <EquipmentPotion name={item.name} hpValue={item.hpValue} goldValue={item.goldValue} id={item.id} key={item.id}/>
    })

    return <div className="user-items-container">
        <CharacterStatsTitle title='Twoje przedmioty' />
        {itemsJsx}
        {collectableJsx}
        {potionJsx}
    </div>
};

export default UserItemContainer;