import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/user-context";
import { useHttp } from "../../hooks/use-http";
import { Character, resurcesResponse } from "../../utils/types";
import ResourceItem from "./ResourceItem";

import './CharacterInfoContainer.css';

const CharacterInfoContainer: React.FC<Character> = (props) => {
    
    const [gold, setGold] = useState(0);
    const [lvl, setLvl] = useState(0);
    const [exp, setExp] = useState(0);
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<resurcesResponse>('api/resources', 'GET', undefined, userCtx.user!.authToken);

useEffect(() => {
    const fetchData = async () => {
        const {data, code} = await sendRequest();
        if (code === 200) {
            setGold(data[0].gold)
            setExp(data[0].exp)
            setLvl(data[0].lvl)
        }
    }
    fetchData();
}, [])

    
    const gameCtx = useContext(UserContext);
    return <div className="character-info-container">
        <div className="character-info-container-name">
            <p>{`${gameCtx.user?.nickname}`}</p>
        </div>
        <div className="character-info-container-details">
            <div className="character-resource-container">
                <ResourceItem key={0} name="GOLD" value={gold} dark={false}/>
                <ResourceItem key={1} name="LVL" value={lvl} dark={true}/>
                <ResourceItem key={2} name="EXP" value={exp} dark={false}/>
                <ResourceItem key={3} name="HP" value={props.health} dark={true}/>
                <ResourceItem key={4} name="Damage" value={props.damage} dark={false}/>
                <ResourceItem key={5} name="Armor" value={props.armor} dark={true}/>
                <ResourceItem key={6} name="Magic Resist" value={props.magicResist} dark={false}/>
            </div>
        </div>
    </div>
};

export default CharacterInfoContainer;