import { Enemy } from "../../utils/types";

import './FightCardsContainer.css';

const FightCardsContainer: React.FC<{enemy: Enemy, enemyCurrentHP: number, myCurrentHP: number, myMaxHP: number}> = (props) => {
    
    const myHpBar = props.myCurrentHP > 0 ? `${(props.myCurrentHP / props.myMaxHP) * 100}%` : '0%';
    const enemyHPBar = props.enemyCurrentHP > 0 ? `${(props.enemyCurrentHP/props.enemy.hp) * 100}%` : '0%';

    return <>
        <div className="fight-container-character-card">
            <div className="character-image" >
            </div>
            <div className="character-hp-bar-border">
                <div className="character-hp-bar" style={{width: myHpBar}}>
                    {props.myCurrentHP}
                </div>
            </div>
        </div>
        <div className="fight-container-character-card">
            <div className="character-image" >
            </div>
            <div className="character-hp-bar-border">
                <div className="character-hp-bar" style={{width: enemyHPBar}}>
                    {props.enemyCurrentHP}
                </div>
            </div>
        </div>
    </>
};

export default FightCardsContainer;