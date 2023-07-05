import { Enemy } from "../../utils/types";

const FightCardsContainer: React.FC<{enemy: Enemy, enemyCurrentHP: number}> = (props) => {
    return <>
        <div className="fight-container-character-card">
            <div className="character-image" >
            </div>
            <div className="character-hp-bar">

            </div>
        </div>
        <div className="fight-container-character-card">
            <div className="character-image" >
            </div>
            <div className="character-hp-bar">
                {props.enemyCurrentHP}
            </div>
        </div>
    </>
};

export default FightCardsContainer;