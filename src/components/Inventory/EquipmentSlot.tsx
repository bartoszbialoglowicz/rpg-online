import { EquipmentItem } from "../../types/ItemTypes"
import ItemContainer from "./ItemContainer";

type Props = {
    slot: EquipmentItem,
    emptySlotImg: string
}

const EquipmentSlot: React.FC<Props> = (props) => {

    const itemSlot = props.slot.item ? <ItemContainer item={props.slot.item} /> : <div className="item-container empty-slot"><img src={props.emptySlotImg}  alt="empty slot"/></div>;

    console.log(props);

   return <div className="equipment-slot">
        {itemSlot}
    </div>
};

export default EquipmentSlot;