import { useContext } from "react";
import { InventoryContext } from "../../store/inventory-context";
import EquipmentSlot from "./EquipmentSlot";

import './EquipmentContainer.css';

import helmet from '../../assets/svgs/helmet-svgrepo-com.svg';
import weapon from '../../assets/svgs/sword-svgrepo-com.svg';
import armour from '../../assets/svgs/armoury-body-svgrepo-com.svg';
import legs from '../../assets/svgs/armoury-legs-svgrepo-com.svg';
import boots from '../../assets/svgs/boots-svgrepo-com.svg'
import gloves from '../../assets/svgs/protection-gloves-svgrepo-com.svg';

const EquipmentContainer = () => {

    const inventoryCtx = useContext(InventoryContext);

    return <div className="equipment-container">
        <div className="equipment-container-row">
            <EquipmentSlot slot={inventoryCtx.equipment.helmet} emptySlotImg={helmet}/>
            <EquipmentSlot slot={inventoryCtx.equipment.weapon} emptySlotImg={weapon}/>
        </div>
        <div className="equipment-container-row">
            <EquipmentSlot slot={inventoryCtx.equipment.gloves} emptySlotImg={gloves}/>
            <EquipmentSlot slot={inventoryCtx.equipment.armor} emptySlotImg={armour}/>
        </div>
        <div className="equipment-container-row">
            <EquipmentSlot slot={inventoryCtx.equipment.trousers} emptySlotImg={legs}/>
            <EquipmentSlot slot={inventoryCtx.equipment.boots} emptySlotImg={boots}/>
        </div>
    </div>
};

export default EquipmentContainer;