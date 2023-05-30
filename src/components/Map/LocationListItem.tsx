import { Location } from "../../utils/types";

const LocationListItem: React.FC<Location> = (props) => {
    return <div className="location-list-item">
        <h3>{props.name}</h3>
        <h5>Required Lvl: {props.lvlRequired}</h5>
    </div>
};

export default LocationListItem;