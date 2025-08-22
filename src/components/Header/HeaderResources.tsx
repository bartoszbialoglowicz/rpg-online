import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/game-context";
import HeaderLvlBar from "./HeaderLvlBar";

import './HeaderResources.css';
 import coins from '../../assets/svgs/coin-svgrepo-com.svg';
import { useNumber } from "../../hooks/use-number";

const HeaderResources = () => {
    
    const gameCtx = useContext(GameContext);
    const numberConverter = useNumber();
    
    const [resources, setResources] = useState(gameCtx.resources);

    const gold = numberConverter.convertWithSIPrefix(resources.gold);

    useEffect(() => {
        setResources(gameCtx.resources);
    }, [gameCtx.resources]);

    return <div className="header-resources">
        <div className="header-resources-gold">{gold} <img src={coins} alt="coins"></img></div>
        <HeaderLvlBar currentEXP={resources.lvl.currentExp} lvlExpLimit={resources.lvl.expPointsGap} lvl={resources.lvl.lvl}/>
    </div>
};

export default HeaderResources;