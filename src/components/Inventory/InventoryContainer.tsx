import StatsContainer from "../Stats/StatsContainer";
import EquipmentContainer from "./EquipmentContainer";

import './InventoryContainer.css';
import ItemsContainer from "./ItemsContainer";

const InventoryContainer = () => {

    return <div className="inventory-container">
        <StatsContainer />
        <EquipmentContainer />
        <ItemsContainer />
    </div>
};

export default InventoryContainer;