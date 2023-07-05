import { useState } from "react";
import { Enemy } from "../../utils/types";
import ActionsContainer from "./ActionsContainer";
import FightCardsContainer from "./FightCardsContainer";

const FightContainer: React.FC<{enemy: Enemy}> = (props) => {

    const [enemyCurrentHP, setEnemyCurrentHP] = useState(props.enemy.hp);

    // TODO: Api request

    return <div className="fight-container">
        <FightCardsContainer enemy={props.enemy} enemyCurrentHP={enemyCurrentHP}/>
        <ActionsContainer /> 
    </div>
};

export default FightContainer;