import { Potion } from "../../utils/types";

import './EquipmentItem.css';

const EquipmentPotion: React.FC<Potion> = (props) => {


    return <div className="equipment-container-item" >
        <p>{props.name}</p>
        <p>Potion</p>
        <p>{`Leczy ${props.hpValue} HP`}</p>
        <p>{`Wartość: ${props.goldValue}`}</p>
    </div>
};

export default EquipmentPotion;