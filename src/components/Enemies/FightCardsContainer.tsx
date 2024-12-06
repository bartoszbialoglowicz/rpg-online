import { Enemy } from "../../utils/types";

import './FightCardsContainer.css';
import avatar1 from '../../assets/images/tmp_avatar.png';
import { useEffect, useState } from "react";

const FightCardsContainer: React.FC<{enemy: Enemy, enemyCurrentHP: number, myCurrentHP: number, myMaxHP: number}> = (props) => {
    
    const myHpBar = props.myCurrentHP > 0 ? `${Math.floor((props.myCurrentHP / props.myMaxHP) * 100)}%` : '0%';
    const enemyHPBar = props.enemyCurrentHP > 0 ? `${Math.floor((props.enemyCurrentHP/props.enemy.health) * 100)}%` : '0%';

    const [userLastHP, setUserLastHP] = useState(props.myCurrentHP);
    const [enemyLastHP, setEnemyLastHP] = useState(props.enemy.health);
    const [userCardAnimations, setUserCardAnimations] = useState("");
    const [enemyCardAnimations, setEnemyCardAnimations] = useState("");

    useEffect(() => {
        setEnemyCardAnimations("");
        setUserCardAnimations("");
        if (props.enemyCurrentHP !== enemyLastHP) {
            setEnemyLastHP(props.enemyCurrentHP);
            setEnemyCardAnimations("test");
        }
        if (userLastHP !== props.myCurrentHP) {
            setUserLastHP(props.myCurrentHP);
            setUserCardAnimations("test");
        }
    }, [props.enemyCurrentHP, props.myCurrentHP]);

    return <div className="fight-cards-container">
        <div className={`fight-container-character-card ${userCardAnimations}`}>
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
        <div className={`fight-container-character-card ${enemyCardAnimations}`}>
            <div className="character-image" >
                <img src={props.enemy.imgSrc} alt="Enemy avatar" />
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