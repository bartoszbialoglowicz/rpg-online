import { useContext, useEffect, useState } from "react";
import { Enemy } from "../../types/GameTypes";
import { useHttp } from "../../hooks/use-http";
import { UserContext } from "../../store/user-context";
import EnemiesList from "./EnemiesList";
import FightContainer from "./FightContainer";

const EnemiesContainer = () => {

    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [isFight, setIsFight] = useState(false);
    const [pickedEnemy, setPickedEnemy] = useState<Enemy>();

    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<Enemy[]>('api/enemies', 'GET', undefined, userCtx.user!.authToken);

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();
            if (code === 200) {
                console.log(data);
                setEnemies(data);
            }
        };
        getData();
    },[]);

    const setEnemyHandler = (enemy: Enemy) => {
        setPickedEnemy(enemy);
        setIsFight(true);
    };

    const endFightHandler = () => {
        setPickedEnemy(undefined);
        setIsFight(false);
    }

    const enemiesJSX = <div className="enemies-container">
            <EnemiesList enemies={enemies} pickEnemyHandler={setEnemyHandler}/>
        </div>;
    
    const fightJSX = pickedEnemy ? <FightContainer enemy={pickedEnemy} onFightEnd={endFightHandler}/> : <p>Ooops, something went wrong.</p>

    return isFight ? fightJSX : enemiesJSX;
};

export default EnemiesContainer;