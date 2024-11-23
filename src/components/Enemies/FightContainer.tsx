import { useContext, useEffect, useState } from "react";
import { Character, Enemy, WebSocketMessage } from "../../utils/types";
import ActionsContainer from "./ActionsContainer";
import FightCardsContainer from "./FightCardsContainer";
import WebsocketService from "../../services/websocketService";
import { UserContext } from "../../store/user-context";
import { GameContext } from "../../store/game-context";
import Alert from "../UI/Alert";

type Props = {
    enemy: Enemy,
    onFightEnd: () => void,
}

const FightContainer: React.FC<Props> = (props) => {

    const authCtx = useContext(UserContext);
    const gameCtx = useContext(GameContext);

    const [characterStats, setCharacterStats] = useState<Character>(gameCtx.character);
    const [enemyStats, setEnemyStats] = useState<Enemy>(props.enemy);
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const [fightIsOver, setFightIsOver] = useState(false);
    const [serverMessage, setServerMessage] = useState('');
    const [loot, setLoot] = useState('');

    const showAlertHandler = () => {
        setAlertIsVisible(true);
    }
    
    const hideAlertHandler = () => {
        setAlertIsVisible(false);
        props.onFightEnd();
    }

    const handleWebSocketMessage = (data: WebSocketMessage) => {
        if (data.character) {
            setCharacterStats(data.character);
        }
        if (data.enemy) {
            setEnemyStats(data.enemy);
        }
        if (data.message) {
            setServerMessage(data.message);
        }
        if (data.fightIsOver) {
            setFightIsOver(data.fightIsOver);
            if (data.exp && data.expPoints && data.lvl) {
                console.log(data);
                gameCtx.updateResources(undefined, {currentExp: data.exp, expPointsGap: data.expPoints, lvl: data.lvl});
            }
            showAlertHandler();
        }
        if (data.loot) {
            setLoot(data.loot);
        }
    }

    const handleAttack = () => {
        if (!fightIsOver) {
            WebsocketService.sendMessage({action: 'user_attack'})
            setTimeout(() => {
                if (!fightIsOver)
                    WebsocketService.sendMessage({action: 'enemy_attack'})
            }, 1000)
        }
        
    }

    useEffect(() => {  
        WebsocketService.connect();
        WebsocketService.addMessageListener(handleWebSocketMessage);
        
        const interval = setInterval(() => {
            if (WebsocketService.isConnected()) {
                WebsocketService.sendMessage({ type: 'set_enemy', enemyId: props.enemy.id });
                WebsocketService.sendMessage({ type: 'set_user', userEmail: authCtx.user!.email });
                clearInterval(interval); // Stop the interval once messages are sent
            }
        }, 100);
    
        return () => {
            console.log("walka zakończona.");
            WebsocketService.removeMessageListener(handleWebSocketMessage);
            WebsocketService.disconnect();
        }
    }, []);

    return <div className="fight-container">
        {alertIsVisible && <Alert 
            title={serverMessage} 
            description={loot === "null" ? "Nie zdobyto łupów." : `Zdobyto ${loot}`}
            buttonText={loot === "null" ? "OPUŚĆ WALKĘ" : "ZABIERAM"}
            onButtonClick={hideAlertHandler} 
            onOutOfBoxClickHandler={hideAlertHandler}/>}
        <FightCardsContainer enemy={props.enemy} enemyCurrentHP={enemyStats.health} myCurrentHP={characterStats.health} myMaxHP={100}/>
        <ActionsContainer onAttack={handleAttack}/> 
    </div>
};

export default FightContainer;