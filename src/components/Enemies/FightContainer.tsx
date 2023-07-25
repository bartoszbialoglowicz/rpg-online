import { useContext, useEffect, useState } from "react";
import { Character, Enemy, WebSocketMessage } from "../../utils/types";
import ActionsContainer from "./ActionsContainer";
import FightCardsContainer from "./FightCardsContainer";
import WebsocketService from "../../services/websocketService";
import { UserContext } from "../../store/user-context";
import { GameContext } from "../../store/game-context";

const FightContainer: React.FC<{enemy: Enemy}> = (props) => {

    const authCtx = useContext(UserContext);
    const gameCtx = useContext(GameContext);

    const [characterStats, setCharacterStats] = useState<Character>(gameCtx.character);
    const [enemyStats, setEnemyStats] = useState<Enemy>(props.enemy);
    
    const handleWebSocketMessage = (data: WebSocketMessage) => {
        if (data.character) {
            setCharacterStats(data.character);
        }
        if (data.enemy) {
            setEnemyStats(data.enemy);
            console.log(enemyStats)
        }
        console.log(data);
    }

    const handleAttack = () => {
        WebsocketService.sendMessage({action: 'user_attack'})
        setTimeout(() => {
            WebsocketService.sendMessage({action: 'enemy_attack'})
        }, 1000)
    }

    useEffect(() => {  
        WebsocketService.connect();
        WebsocketService.addMessageListener(handleWebSocketMessage);
        
        const interval = setInterval(() => {
            console.log('first');
            if (WebsocketService.isConnected()) {
                console.log('opem');
                WebsocketService.sendMessage({ type: 'set_enemy', enemyId: props.enemy.id });
                WebsocketService.sendMessage({ type: 'set_user', userEmail: authCtx.user!.email });
                clearInterval(interval); // Stop the interval once messages are sent
            }
        }, 100);
    
        return () => {
            WebsocketService.removeMessageListener(handleWebSocketMessage);
            WebsocketService.disconnect();
        }
    }, []);

    return <div className="fight-container">
        <FightCardsContainer enemy={props.enemy} enemyCurrentHP={enemyStats.hp} myCurrentHP={characterStats.health} myMaxHP={100}/>
        <ActionsContainer onAttack={handleAttack}/> 
    </div>
};

export default FightContainer;