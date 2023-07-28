import { Enemy } from "../../utils/types";

import './FightCardsContainer.css';
import avatar1 from '../../assets/images/tmp_avatar.png';
import avatar2 from '../../assets/images/tmp_avatar2.png';

const FightCardsContainer: React.FC<{enemy: Enemy, enemyCurrentHP: number, myCurrentHP: number, myMaxHP: number}> = (props) => {
    
    const myHpBar = props.myCurrentHP > 0 ? `${Math.floor((props.myCurrentHP / props.myMaxHP) * 100)}%` : '0%';
    const enemyHPBar = props.enemyCurrentHP > 0 ? `${Math.floor((props.enemyCurrentHP/props.enemy.hp) * 100)}%` : '0%';

    return <div className="fight-cards-container">
        <div className="fight-container-character-card">
            <div className="character-image" >
                <img src={avatar1} alt="User avatar">
                </img>
            </div>
            <div className="character-hp-bar-border">
                <div className="character-hp-bar" style={{width: myHpBar}}>
                    
                </div>
                <div className="character-hp-bar-text">{myHpBar}</div>
            </div>
        </div>
        <div className="fight-container-character-card">
            <div className="character-image" >
                <img src={avatar2} alt="Enemy avatar" />
            </div>
            <div className="character-hp-bar-border">
                <div className="character-hp-bar" style={{width: enemyHPBar}}>
                </div>
                <div className="character-hp-bar-text">{enemyHPBar}</div>
            </div>
        </div>
    </div>
};

export default FightCardsContainer;