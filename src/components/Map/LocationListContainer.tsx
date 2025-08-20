import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import LocationListItem from "./LocationListItem";
import type { Location } from "../../types/GameTypes";

import './LocationListContainer.css';
import { GameContext } from "../../store/game-context";
import { useTimeCalculator } from "../../hooks/use-time-calculator";
import TravelContainer from "./TravelContainer";

const LocationListContainer = () => {
    
    const userCtx = useContext(UserContext);
    const gameCtx = useContext(GameContext);

    const sendRequest = useHttp<Location[]>('api/locations', 'GET', undefined, userCtx.user?.authToken);
    const timeCalculator = useTimeCalculator();

    const [locationsJSX, setLocationsJSX] = useState<JSX.Element[]>([]);
    const [travelTime, setTraveltime] = useState(gameCtx.userLocation.travelTime);
    const [remainingTime, setRemainingTime] = useState<string>(timeCalculator.getTimeUnits(travelTime));

    const updateTravelTime = (newTravelTime: Date, startTravelTime: Date) => {
        gameCtx.updateTravelTime(newTravelTime, startTravelTime);
        setTraveltime(newTravelTime);
    }

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                const tmpJSX = data.map((el: Location) => <LocationListItem location={el} onTravelHandler={updateTravelTime} key={el.id}/>);
                const index = data.findIndex(el => el.id === gameCtx.userLocation.location.id);
                tmpJSX[index] = <LocationListItem location={data[index]} onTravelHandler={updateTravelTime} key={index} currentlyVisited={true}/>
                setLocationsJSX(tmpJSX);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(timeCalculator.getTimeUnits(travelTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [travelTime, timeCalculator])

    return <>
        {!remainingTime && <div className="location-list-container">
              {locationsJSX}
        </div>}
        {remainingTime && <TravelContainer startTravelTime={gameCtx.userLocation.startTravelTime} travelTime={travelTime} remainingTime={remainingTime} />}
    </>
};

export default LocationListContainer;