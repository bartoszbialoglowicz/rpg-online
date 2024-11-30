import StatsContainer from "../Stats/StatsContainer";
import EquipmentContainer from "./EquipmentContainer";

import './InventoryContainer.css';

const InventoryContainer = () => {

    return <div className="inventory-container">
        <StatsContainer />
        <EquipmentContainer />
    </div>
};

export default InventoryContainer;