import { ButtonController, Item, Potion } from "../../utils/types";
import EquipmentItem from "./EquipmentItem";
import { CollectableItem } from "../../utils/types";
import EquipmentCollectableItem from "./EquipmentCollectableItem";
import EquipmentPotion from "./EquipmentPotion";

import './UserItemsContainer.css';
import CharacterStatsTitle from "../Character/CharacterStatsTitle";

const UserItemContainer: React.FC<{
    items: Item[],
    potions: Potion[],
    collectableItems: CollectableItem[],
    buttons?: ButtonController[],
    onHoverHandler?: (item: Item) => void, 
    onMouseLeaveHandler?: () => void
    }> = (props) => {

    const itemsJsx = props.items.map((item: Item, index: number) => {
        const buttons = props.buttons ? props.buttons : [];
        return <EquipmentItem item={item} key={index} buttons={buttons} onHoverHandler={props.onHoverHandler} onMouseLeaveHandler={props.onMouseLeaveHandler} />
    });
    const collectableJsx = props.collectableItems.map((item: CollectableItem) => {
        return <EquipmentCollectableItem name={item.name} goldValue={item.goldValue} id={item.id} key={item.id}/>
    });
    const potionJsx = props.potions.map((item: Potion) => {
        return <EquipmentPotion name={item.name} hpValue={item.hpValue} goldValue={item.goldValue} id={item.id} key={item.id}/>
    });

    return <div className="user-items-container">
        <CharacterStatsTitle title='Twoje przedmioty' />
        {itemsJsx}
        {collectableJsx}
        {potionJsx}
    </div>
};

export default UserItemContainer;