import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/game-context";
import HeaderLvlBar from "./HeaderLvlBar";

import './HeaderResources.css';
import coins from '../../assets/images/coins.png';

const HeaderResources = () => {
    
    const gameCtx = useContext(GameContext);
    
    const [resources, setResources] = useState(gameCtx.resources);

    useEffect(() => {
        setResources(gameCtx.resources);
    }, [gameCtx.resources]);
    return <div className="header-resources">
        <div className="header-resources-gold">{resources.gold} <img src={coins} alt="coins"></img></div>
        <HeaderLvlBar currentEXP={resources.lvl.currentExp} lvlExpLimit={resources.lvl.expPointsGap} lvl={resources.lvl.lvl}/>
    </div>
};

export default HeaderResources;