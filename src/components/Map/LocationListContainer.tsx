import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import LocationListItem from "./LocationListItem";
import { Location } from "../../utils/types";

const LocationListContainer = () => {
    
    const token = useContext(UserContext).user?.authToken;
    const sendRequest = useHttp<Location[]>('api/locations', 'GET', undefined, token);
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationsJSX, setLocationsJSX] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                setLocations(data);
                const tmpJSX = data.map((el: Location) => <LocationListItem id={el.id} name={el.name} lvlRequired={el.lvlRequired} key={el.id}/>);
                setLocationsJSX(tmpJSX);
            }
        }
        getData();
    }, []);

    return <div className="location-list-container">
        {locationsJSX}
    </div>
};

export default LocationListContainer;