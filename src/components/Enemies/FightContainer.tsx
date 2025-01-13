import { useContext, useEffect, useState } from "react";
import ActionsContainer from "./ActionsContainer";
import FightCardsContainer from "./FightCardsContainer";
import WebsocketService from "../../services/websocketService";
import { UserContext } from "../../store/user-context";
import { GameContext } from "../../store/game-context";
import Alert from "../UI/Alert";
import { Enemy, Stats, WebSocketMessage } from "../../types/GameTypes";
import { StatsContext } from "../../store/stats-context";
import { InventoryContext } from "../../store/inventory-context";
import { Item } from "../../types/ItemTypes";
import { AppSettings } from "../../utils/settings";
import ItemContainer from "../Inventory/ItemContainer";
import useAudio from "../../hooks/use-audio";

import './FightContainer.css';
import FightLogsContainer from "./FightLogsContainer";

type Props = {
    enemy: Enemy,
    onFightEnd: () => void,
}

const FightContainer: React.FC<Props> = (props) => {

    const authCtx = useContext(UserContext);
    const statsContext = useContext(StatsContext);
    const gameCtx = useContext(GameContext);
    const inventoryCtx = useContext(InventoryContext);

    const [characterStats, setCharacterStats] = useState<Stats>(statsContext.getAllStats());
    const [enemyStats, setEnemyStats] = useState<Enemy>(props.enemy);
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const [fightIsOver, setFightIsOver] = useState(false);
    const [serverMessage, setServerMessage] = useState('');
    const [endFightMessage, setEndFightMessage] = useState('');
    const [loot, setLoot] = useState<Item>();
    const [lootJSX, setLootJSX] = useState<JSX.Element>();
    const [turnLocked, setTurnLocked] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const playerMaxHP = statsContext.getAllStats().health;

    const normalHitSound = require('../../assets/audio/normal_hit.wav');
    const criticallHitSound = require('../../assets/audio/critical_hit.wav');

    const {isPlaying, play, toggle} = useAudio(normalHitSound);

    const showAlertHandler = () => {
        setAlertIsVisible(true);
    }

    const turnOffAudio = () => {
        if (isPlaying){
            toggle();
        }
    }

    const addLogHandler = (wsMessage: WebSocketMessage) => {

        const updateState = (msg: string) => { setLogs(prevState => [...prevState, msg])}
        const damageDealtMsg = (name: string, val: number, isCrit?: boolean) => isCrit ? `${name} uderzył krytycznie zadając ${val} obrażeń!` : `${name} zadał ${val} obrażeń.`;
        const noDamageDealt = (name: string) => `${name} swoim ciosem nie zdołał zadać żadnych obrażeń.`;

        if (wsMessage.userDamageDealt)
            updateState(damageDealtMsg(authCtx.user!.nickname, wsMessage.userDamageDealt, wsMessage.criticalHit));
        else if (wsMessage.enemyDamageDealt)
            updateState(damageDealtMsg(props.enemy.name, wsMessage.enemyDamageDealt, wsMessage.criticalHit));
        else if (wsMessage.enemyDamageDealt === 0)
            updateState(noDamageDealt(props.enemy.name));
        else if (wsMessage.userDamageDealt === 0)
            updateState(noDamageDealt(authCtx.user!.nickname));
        else if (wsMessage.message)
            updateState(wsMessage.message)
    }

    const playAttackSound = (critical: boolean) => {
        play(critical ? criticallHitSound : normalHitSound);
    }

    const hideAlertHandler = () => {

        setAlertIsVisible(false);
        props.onFightEnd();
    }

    const getAbsoluteUrl = (img: string) => {
        return 'http://' + AppSettings.SERVER_IP + img;
    }

    const handleWebSocketMessage = (data: WebSocketMessage) => {
        // Add fight logs
        addLogHandler(data);

        if (data.character) {
            playAttackSound(data.criticalHit!);
            setCharacterStats(data.character);
        }
        if (data.enemy) {
            playAttackSound(data.criticalHit!);
            setEnemyStats(data.enemy);
        }
        if (data.message) {
            setServerMessage(data.message);
        }
        if (data.messageShort)
            setEndFightMessage(data.messageShort);
        if (data.fightIsOver) {
            setFightIsOver(data.fightIsOver);
            if (data.exp && data.expPoints && data.lvl) {
                gameCtx.updateResources(undefined, {currentExp: data.exp, expPointsGap: data.expPoints, lvl: data.lvl});
            }
            showAlertHandler();
        }
        if (data.loot) {
            let loot = data.loot;
            loot.imageUrl = getAbsoluteUrl(loot.imageUrl!);
            setLoot(data.loot);
            setLootJSX(<ItemContainer item={loot}/>);
            inventoryCtx.addInventoryItem(data.loot);
        }

        
    }

    const handleAttack = () => {
        if (!fightIsOver && !turnLocked) {
            setTurnLocked(true);
            WebsocketService.sendMessage({action: 'user_attack'})
            setTimeout(() => {
                if (!fightIsOver)
                    WebsocketService.sendMessage({action: 'enemy_attack'});
                setTurnLocked(false);
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
            turnOffAudio();
        }
    }, []);

    return <div className="fight-container">
        {alertIsVisible && <Alert 
            title={endFightMessage} 
            description={!loot ? "Nie zdobyto łupów." : `Zdobyto łupy:`}
            buttonText={!loot  ? "OPUŚĆ WALKĘ" : "ZABIERAM"}
            onButtonClick={hideAlertHandler} 
            onOutOfBoxClickHandler={hideAlertHandler}
            children={lootJSX}
            />}
            <div className="fight-top-container">
                <FightCardsContainer enemy={props.enemy} enemyCurrentHP={enemyStats.health} myCurrentHP={characterStats.health} myMaxHP={playerMaxHP}/>
                <FightLogsContainer logs={logs} />
            </div>
            <div className="fight-bottom-container">
                <ActionsContainer onAttack={handleAttack}/>
            </div>
    </div>
};

export default FightContainer;