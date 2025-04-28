import { useContext, useEffect, useState } from "react";
import { useTimeCalculator } from "../../hooks/use-time-calculator";
import { UserContext } from "../../store/user-context";
import { GameContext } from "../../store/game-context";
import { useHttp } from "../../hooks/use-http";
import { Location, UserLocation } from "../../types/GameTypes";

import './MapContainer.css';
import LocationListItem from "./LocationListItem";
import Modal from "../UI/Modal";
import TravelContainer from "./TravelContainer";

const MapContainer = () => {

    const userCtx = useContext(UserContext);
    const gameCtx = useContext(GameContext);

    const timeCalculator = useTimeCalculator();

    const [locations, setLocations] = useState<Location[]>([]);
    const [locationJSX, setLocationJSX] = useState<JSX.Element[]>([]);
    const [mapWidth, setMapWidth] = useState<number>(0);
    const [mapHeight, setMapHeight] = useState<number>(0);
    const [locationDisplay, setLocationDisplay] = useState<boolean>(false);
    const [travelTime, setTraveltime] = useState(gameCtx.userLocation.travelTime);
    const [currentDisplayLocation, setCurrentDisplayLocation] = useState<Location>(gameCtx.userLocation.location);
    const [remainingTime, setRemainingTime] = useState<string>(timeCalculator.getTimeUnits(travelTime));
    const sendRequest = useHttp<Location[]>('api/locations', 'GET', undefined, userCtx.user?.authToken);

    const getMapWidth = (locations: Location[]) => {
        //find lowest xCoordinate
        const xCoordinates = locations.map(el => el.xCoordinate);
        const minX = Math.min(...xCoordinates);
        //find highest xCoordinate
        const maxX = Math.max(...xCoordinates);
        //calculate width
        const width = maxX + minX;
        
        return width;
    }

    const getMapHeight = (locations: Location[]) => {
        //find lowest yCoordinate
        const yCoordinates = locations.map(el => el.yCoordinate);
        const minY = Math.min(...yCoordinates);
        //find highest yCoordinate
        const maxY = Math.max(...yCoordinates);
        //calculate height
        const height = maxY + minY;
        return height;
    }

    const setLocationToDisplay = (location: Location) => {
        setCurrentDisplayLocation(location);
        setLocationDisplay(true);
    }


    const createMap = (width: number, height: number, playerLocation: UserLocation) => {
        const map: JSX.Element[] = [];
    
        for (let i = 0; i <= height; i++) {
            for (let j = 0; j <= width; j++) {
                const location = locations.find(el => el.xCoordinate === j && el.yCoordinate === i);
                
                const isPlayerHere = location && 
                    location.xCoordinate === playerLocation.location.xCoordinate &&
                    location.yCoordinate === playerLocation.location.yCoordinate;
                
                if (location) {
                    map.push(
                        <div 
                        key={location.id} 
                        className={`location ${isPlayerHere ? 'player-location' : ''}`}
                        onClick={() => setLocationToDisplay(location)}>
                            {location.name}
                        </div>
                    );
                } else {
                    map.push(<div key={`${i}-${j}`} className="empty-location"></div>);
                }
            }
        }
        return map;
    };
    
    const updateTravelTime = (newTravelTime: Date, startTravelTime: Date) => {
        gameCtx.updateTravelTime(newTravelTime, startTravelTime);
        setTraveltime(newTravelTime);
    }

    
    const { userLocation } = useContext(GameContext);

    useEffect(() => {
        const getData = async () => {
            const { data, code } = await sendRequest();
            if (code === 200) {
                setLocations(data);
                setLocationJSX(createMap(getMapWidth(data), getMapHeight(data), userLocation));
            }
        };
        getData();
    }, [userLocation]);


    useEffect(() => {
        if (locations.length) {
            const width = getMapWidth(locations);
            const height = getMapHeight(locations);
            setMapWidth(width);
            setMapHeight(height);
            const map = createMap(width, height, userLocation);
            setLocationJSX(map);
        }
    }
    , [locations]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(timeCalculator.getTimeUnits(travelTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [travelTime, timeCalculator])

    return <>
        { locationDisplay && <Modal onClickHandler={() => setLocationDisplay(false)} size="medium">
                <>{!remainingTime &&<div className="location-container">
                    <LocationListItem location={currentDisplayLocation} onTravelHandler={updateTravelTime}/>
                </div>}
                {remainingTime && <TravelContainer startTravelTime={gameCtx.userLocation.startTravelTime} travelTime={travelTime} remainingTime={remainingTime} />}
                </>
            </Modal>}
        <div className="map-container">
            <div className="map-grid" style={{
                gridTemplateColumns: `repeat(${mapWidth + 1}, 1fr)`,
                gridTemplateRows: `repeat(${mapHeight + 1}, 1fr)`
            }}>
                {locationJSX}
            </div>
        </div>
    </>

};

export default MapContainer;