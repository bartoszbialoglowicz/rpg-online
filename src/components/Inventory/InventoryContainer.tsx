import StatsContainer from "../Stats/StatsContainer";
import ComparatorContainer from "./ComparatorContainer";
import EquipmentContainer from "./EquipmentContainer";

import './InventoryContainer.css';
import ItemsContainer from "./ItemsContainer";

const InventoryContainer = () => {

    return <div className="inventory-container">
        <ComparatorContainer />
        <StatsContainer />
        <EquipmentContainer />
        <ItemsContainer />
    </div>
};

export default InventoryContainer;