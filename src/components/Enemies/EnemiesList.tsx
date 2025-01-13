import { Enemy } from "../../types/GameTypes";
import Card from "../UI/Card";

import './EnemiesList.css';
import EnemiesListItem from "./EnemiesListItem";

const EnemiesList: React.FC<{enemies: Enemy[], pickEnemyHandler: (enemy: Enemy) => void }> = (props) => {
    const enemiesJSX = props.enemies.map((el: Enemy) => {
        return <Card key={el.id}>
            <EnemiesListItem enemy={el} onClickHandler={props.pickEnemyHandler}/>
        </Card>
    });

    return <div className="enemies-container-list">
        {enemiesJSX}
    </div>
};

export default EnemiesList;