import { useContext, useEffect, useState } from "react";
import { Character, Enemy, Item, WebSocketMessage } from "../../utils/types";
import ActionsContainer from "./ActionsContainer";
import FightCardsContainer from "./FightCardsContainer";
import WebsocketService from "../../services/websocketService";
import { UserContext } from "../../store/user-context";
import { GameContext } from "../../store/game-context";
import Alert from "../UI/Alert";
import useAudio from "../../hooks/use-audio";

const FightContainer: React.FC<{enemy: Enemy}> = (props) => {

    const authCtx = useContext(UserContext);
    const gameCtx = useContext(GameContext);

    const [characterStats, setCharacterStats] = useState<Character>(gameCtx.character);
    const [enemyStats, setEnemyStats] = useState<Enemy>(props.enemy);
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const [fightIsOver, setFightIsOver] = useState(false);
    const [serverMessage, setServerMessage] = useState('');
    const [loot, setLoot] = useState<Item>();
    const [lootJSX, setLootJSX] = useState<JSX.Element>();

    const paul = require("../../assets/audio/paul.mp3");

    const {isPlaying, toggle} = useAudio(paul);

    const showAlertHandler = () => {
        setAlertIsVisible(true);
    }
    
    const hideAlertHandler = () => {
        setAlertIsVisible(false);
        toggle();
    }

    const handleWebSocketMessage = (data: WebSocketMessage) => {
        if (data.character) {
            setCharacterStats(data.character);
        }
        if (data.enemy) {
            setEnemyStats(data.enemy);
            console.log(enemyStats)
        }
        if (data.message) {
            setServerMessage(data.message);
        }
        if (data.fightIsOver) {
            setFightIsOver(data.fightIsOver);
            if (data.exp && data.expPoints && data.lvl) {
                gameCtx.updateResources(undefined, {currentExp: data.exp, expPointsGap: data.expPoints, lvl: data.lvl});
            }
            setLootJSX(<div><img src={data.loot?.imageUrl} alt={data.loot?.name} /></div>);
            console.log(data);
            showAlertHandler();
            toggle();
        }
        if (data.loot) {
            setLoot(data.loot);
        }
        console.log(data);
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
        {alertIsVisible && <Alert 
            title={serverMessage} 
            description={`Loot: ${loot}`}
            buttonText="ZABIERAM"
            onButtonClick={hideAlertHandler}
            children={lootJSX} 
            onOutOfBoxClickHandler={hideAlertHandler}/>}
        <FightCardsContainer enemy={props.enemy} enemyCurrentHP={enemyStats.hp} myCurrentHP={characterStats.health} myMaxHP={100}/>
        <ActionsContainer onAttack={handleAttack}/> 
    </div>
};

export default FightContainer;