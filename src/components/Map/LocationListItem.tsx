import { useContext, useState } from "react";
import type { Location } from "../../types/GameTypes";

import './LocationListItem.css';
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";

type RequestData = {
        path: string[],
        travelTime: number,
        travelEndDatetime: Date
}

type Props = {
    location: Location,
    onTravelHandler: (newTravelTime: Date, currentTime: Date) => void,
    currentlyVisited?: boolean,
}

const LocationListItem: React.FC<Props> = (props) => {

    const [isSelected, setIsSelected] = useState("");
    const token = useContext(UserContext).user?.authToken;

    const currentTime = new Date();

    const sendRequest = useHttp<RequestData>(
        'api/locations/travel/', 
        "POST",
        {'target_location_id': props.location.id, 'time': currentTime.toJSON()},
        token
    );

    const onClickHandler = async () => {
        setIsSelected(() => isSelected === "" ? "location-selected" : "");
        const requestData = await sendRequest();
        props.onTravelHandler(new Date(requestData.data.travelEndDatetime), currentTime);
    }

    return <Card>
        <div className={`location-list-item ${isSelected}`} onClick={onClickHandler}>
        <div className="location-list-item-image">
            <img src={props.location.imageUrl} alt={props.location.name} />
            {props.currentlyVisited && <h2 className="img-title">Obecnie odwiedzana</h2>}
        </div>
        <div className="location-list-item-info">
            <h3>{props.location.name}</h3>
            <h4>Wymagany poziom: {props.location.lvlRequired}</h4>
            <p>{props.location.description}</p>
            {!props.currentlyVisited && <Button text="Przejdź"/>}
        </div>
        </div>
    </Card>
    
};

export default LocationListItem;