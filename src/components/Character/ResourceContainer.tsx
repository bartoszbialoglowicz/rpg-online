import { useContext } from "react";
import ResourceItem from "./ResourceItem";
import { GameContext } from "../../store/game-context";

const ResourceContainer = () => {

    const gameCtx = useContext(GameContext);

    return <div className="character-resource-container">
        <ResourceItem name="GOLD" value={gameCtx.resources.gold} dark={false}/>
        <ResourceItem name="LVL" value={gameCtx.resources.lvl.lvl} dark={true}/>
        <ResourceItem name="EXP" value={gameCtx.resources.lvl.currentExp} dark={false}/>
    </div>
};

export default ResourceContainer;