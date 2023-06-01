import { Store } from "../../utils/types"

const StoreContainerItem: React.FC<Store> = (props) => {
    return <div className="store-container-item">
        <h3>{props.name}</h3>
        <h5>{props.type}</h5>
    </div>
};

export default StoreContainerItem;