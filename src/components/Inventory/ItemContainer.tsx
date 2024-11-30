import { Item } from "../../types/ItemTypes"

type Props = {
    item: Item;
}

const ItemContainer: React.FC<Props> = (props) => {
    return <div className={`item-container item-${props.item.rarity}`}>
        <img src={props.item.imageUrl} alt={props.item.name} />
    </div>
};

export default ItemContainer;