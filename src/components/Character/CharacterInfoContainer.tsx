import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/user-context";
import { useHttp } from "../../hooks/use-http";
import { Character, ItemStatsValues, Resource } from "../../utils/types";
import ResourceItem from "./ResourceItem";

import './CharacterInfoContainer.css';
import { GameContext } from "../../store/game-context";

type Props = Character & {statsToCompare?: ItemStatsValues};

const CharacterInfoContainer: React.FC<Props> = (props) => {
    
    const gameCtx = useContext(GameContext);
    const userCtx = useContext(UserContext);

    return <div className="character-info-container">
        <div className="character-info-container-name">
            <p>{`${userCtx.user?.nickname}`}</p>
        </div>
        <div className="character-info-container-details">
            <div className="character-resource-container">
                <ResourceItem key={0} name="GOLD" value={gameCtx.resources.gold} dark={false} />
                <ResourceItem key={1} name="LVL" value={gameCtx.resources.lvl.lvl} dark={true}/>
                <ResourceItem key={2} name="EXP" value={gameCtx.resources.lvl.currentExp} dark={false}/>
                <ResourceItem key={3} name="HP" value={props.health} dark={true} statsToCompare={props.statsToCompare?.health}/>
                <ResourceItem key={4} name="Damage" value={props.damage} dark={false} statsToCompare={props.statsToCompare?.damage}/>
                <ResourceItem key={5} name="Armor" value={props.armor} dark={true} statsToCompare={props.statsToCompare?.armor}/>
                <ResourceItem key={6} name="Magic Resist" value={props.magicResist} dark={false} statsToCompare={props.statsToCompare?.magicResist}/>
            </div>
        </div>
    </div>
};

export default CharacterInfoContainer;