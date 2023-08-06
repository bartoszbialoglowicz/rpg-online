import CharacterStatsContainer from "../Character/CharacterStatsContainer";
import EquipmentItemsContainer from "./EquipmentItemsContainer";
import UserItemContainer from "./UserItemContainer";

import './Equipment.css';

const Equipment = () => {
    return <div className="equipment">
        <CharacterStatsContainer />
        <EquipmentItemsContainer />
        <UserItemContainer />
    </div>
};

export default Equipment;