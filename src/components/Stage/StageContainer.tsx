import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/game-context";

import './StageContainer.css';
import ClickableElement from "./ClickableElement";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import { Dialog } from "../../types/StoryTypes";
import DialogContainer from "../Story/DialogContainer";
import { Enemy, Location, LocationElementType, NPC, TravelData } from "../../types/GameTypes";
import FightContainer from "../Enemies/FightContainer";
import { useTimeCalculator } from "../../hooks/use-time-calculator";
import TravelContainer from "../Map/TravelContainer";
import { AppSettings } from "../../utils/settings";

const getAbsoluteUrl = (img: string) => {
        return 'http://' + AppSettings.SERVER_IP + img;
    }

const StageContainer = () => {

    const gameCtx = useContext(GameContext);
    const userCtx = useContext(UserContext);
    const timeCalculator = useTimeCalculator();

    const [openedDialog, setOpenedDialog] = useState<Dialog | null>(null);
    const [allDialogs, setAllDialogs] = useState<Dialog[]>([]);
    const [pickedEnemy, setPickedEnemy] = useState<Enemy | null>(null);
    const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
    const [travelTime, setTraveltime] = useState(gameCtx.userLocation.travelTime);
    const [remainingTime, setRemainingTime] = useState<string>(timeCalculator.getTimeUnits(travelTime));

    const currentTime = new Date();

    const sendRequest = useHttp<Dialog[]>(`api/dialogs/`, 'GET', undefined, userCtx.user?.authToken);

    const updateLocationRequest = useHttp<TravelData>(
        'api/locations/travel/', 
        "POST",
        {
            'target_location_id': pickedLocation?.id, 
            'time': currentTime.toJSON(),
            'parent_location': pickedLocation?.parent_location
        },
        userCtx.user?.authToken
    );

    const getInitialDialog = (dialogs: Dialog[]) => {
        return dialogs.find(dialog => dialog.starter);
    }

    const fetchDialog = async (npcId: number) => {
        try {
            const {data, code} = await sendRequest(`api/dialogs/?npc=${npcId}`);
            if (code === 200) {
                setAllDialogs(data);
                const firstDialog = getInitialDialog(data);
                setOpenedDialog(firstDialog ? firstDialog : null);
            }
            else {
                console.log(data);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const renderDialog = (dialogId: number) => {
        const dialog = allDialogs.find(dialog => dialog.id === dialogId);
        if (dialog) {
            setOpenedDialog(prevState => dialog);
        } else {
            setOpenedDialog(null);
        }
    }

    const updatePickedLocation = (location: Location) => {
        setPickedLocation(prev => location);
    }

    const onClickTravelHandler = async (location: Location) => {
        console.log(location);
        updatePickedLocation(location)
    }

    const updateTravelTime = (newTravelTime: Date, startTravelTime: Date) => {
        gameCtx.updateTravelTime(newTravelTime, startTravelTime);
        setTraveltime(newTravelTime);
    }

    const getUpdatedImgUrls = (location: Location) => {
        const updatedElements = location.elements.map(el => {
            if (el.enemy)
                return {...el, enemy: {...el.enemy, imgSrc: getAbsoluteUrl(el.enemy.imgSrc)}}
            if (el.location_element)
                return {...el, location_element: {...el.location_element, imageUrl: getAbsoluteUrl(el.location_element.imageUrl)}}
            if (el.sublocation_element)
                return {...el, sublocation_element: {...el.sublocation_element, imageUrl: getAbsoluteUrl(el.sublocation_element.imageUrl)}}
            if (el.npc)
                return {...el, npc: {...el.npc, imageUrl: getAbsoluteUrl(el.npc.imageUrl)}}
            if (el.item)
                return {...el, item: {...el.item, imageUrl: getAbsoluteUrl(el.item.imageUrl)}}
            return el
        });

        return updatedElements;
    }

    const getUpdatedLocation = (location:Location) => {
        const updatedLocation = {...location, elements: getUpdatedImgUrls(location), imageUrl: getAbsoluteUrl(location.imageUrl) } as Location;
        return updatedLocation;
    }

    const onClickHandler = (type: LocationElementType, npc?: NPC, location?: Location, enemy?: Enemy) => {
        if (type === "npc" && npc)
            fetchDialog(npc.id);
        if (type === "enemy" && enemy)
            setPickedEnemy(enemy);
        if ((type === "location" || type === "subLocation") && location)
            onClickTravelHandler(location);
    }

    useEffect(() => {
        const sendRequest = async () => {
            const requestData = await updateLocationRequest();
            updateTravelTime(new Date(requestData.data.travelEndDatetime), currentTime);
            gameCtx.updateUserLocationAsync(getUpdatedLocation(requestData.data.targetLocation), requestData.data.travelTime);
        }
        if (pickedLocation)
            sendRequest();
    }, [pickedLocation])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(timeCalculator.getTimeUnits(travelTime));
        }, 1000);
    
        return () => clearInterval(interval);
    }, [travelTime])

    const clickableElements = gameCtx.userLocation.location.elements.map((element, index) => (
        <ClickableElement
            key={index}
            element={element}
            onClick={onClickHandler}
        />
    ));

    return (
        <div className="stage-container" style={{backgroundImage: `url(${gameCtx.userLocation.location.imageUrl})`}}>
            {(!openedDialog && !pickedEnemy && !remainingTime) && clickableElements}
            {openedDialog && <DialogContainer dialog={openedDialog} onOptionSelect={renderDialog} npc={openedDialog.npc}/>}
            {pickedEnemy && <FightContainer enemy={pickedEnemy} onFightEnd={() => setPickedEnemy(null)}/>}
            {remainingTime && <TravelContainer startTravelTime={gameCtx.userLocation.startTravelTime} travelTime={travelTime} remainingTime={remainingTime} />}
        </div>
    );
}

export default StageContainer;