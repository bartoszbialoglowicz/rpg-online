import './StatsItem.css';

type Props = {
    name: string,
    value: number,
    svgSrc: string,
    cssName: string
}

const StatsItem: React.FC<Props> = (props) => {

    return <div className="stats-item">
        <div className={`stats-item-image stats-${props.cssName}`}>
            <img src={props.svgSrc} alt={props.name} />
        </div>
        <div className="stats-item-value">
            <div>{props.name}</div>
            <div>{props.value}</div>
        </div>
    </div>
};

export default StatsItem;