import { Enemy } from "../../utils/types";

import './EnemiesList.css';

const EnemiesList: React.FC<{enemies: Enemy[], pickEnemyHandler: (enemy: Enemy) => void }> = (props) => {
    const enemiesJSX = props.enemies.map((el: Enemy) => {
        return <div className="enemy-container" key={el.id} onClick={()=>props.pickEnemyHandler(el)}>
            <h3>{el.name}</h3>
            <p>{`Lvl: ${el.lvl}`}</p>
        </div>
    })
    return <div className="enemies-container-enemies-list">
        {enemiesJSX}
    </div>
};

export default EnemiesList;