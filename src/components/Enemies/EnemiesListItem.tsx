import type { Enemy } from "../../types/GameTypes";
import Button from "../UI/Button";

import './EnemiesListItem.css';

type Props = {
    enemy: Enemy,
    onClickHandler: (enemy: Enemy) => void;
}

const EnemiesListItem: React.FC<Props> = (props) => {

    const onClickHandler = () => {
        props.onClickHandler(props.enemy);
    }

    return <div className="enemies-list-item">
        <div className="enemies-list-item-image">
            <img src={props.enemy.imgSrc} alt={props.enemy.name}/>
        </div>
        <div className="enemies-list-item-info">
            <h3>{props.enemy.name}</h3>
            <i>{`Poziom: ${props.enemy.lvl}`}</i>
        </div>
        <div className="enemies-list-item-action">
            <Button text="ATAKUJ" onClickHandler={onClickHandler}/>
        </div>
    </div>
};

export default EnemiesListItem;