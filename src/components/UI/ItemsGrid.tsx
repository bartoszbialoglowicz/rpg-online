import type { JSX } from 'react';
import './ItemsGrid.css';

type Props = {
    children: JSX.Element[],
    gridItemsCount: number,
}

const ItemsGrid: React.FC<Props> = (props) => {

    const nums: number[] = [...Array(props.gridItemsCount - props.children.length)];

    const it = nums.map((el, index) => <div className="grid-item empty" key={index} />)
    const items = props.children.map((el, index) => <div className="grid-item" key={index}>{el}</div>);

    return <div className="items-grid">
        {items}
        {it}
    </div>
};

export default ItemsGrid;