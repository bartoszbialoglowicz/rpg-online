import { Item } from "../../types/ItemTypes"

import './ItemContainer.css';
type Props = {
    item: Item;
    onClick?: (item: Item) => void
}

const ItemContainer: React.FC<Props> = (props) => {

    const onClickHandler = () => {
        if (props.onClick)
            props.onClick(props.item);
    }

    return <div className={`item-container item-${props.item.rarity}`} onClick={onClickHandler}>
        <img src={props.item.imageUrl} alt={props.item.name} /></div>
};

export default ItemContainer;