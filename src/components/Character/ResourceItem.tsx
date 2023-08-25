import './ResourceItem.css';

const ResourceItem: React.FC<{name: string, value: number, dark: boolean, statsToCompare?: number}> = (props) => {
    
    // Check if there should be dark background
    const styles = props.dark ? "character-resource-item dark" : "character-resource-item";
    const statsCompareStyles = props.statsToCompare && props.statsToCompare > 0 ? 'character-resource-item-stats-postive' : 'character-resource-item-stats-negative';
    const comparedStatsText = props.statsToCompare ? 
        (props.statsToCompare > 0 ? <span className={statsCompareStyles}>{`(+${props.statsToCompare})`}</span> : <span className={statsCompareStyles}>{`(${props.statsToCompare})`}</span>) 
        : '';
    const comparedValue = props.statsToCompare ? props.value + props.statsToCompare : props.value;
    return <div className={styles}>
        {`${props.name}: ${comparedValue} `}{comparedStatsText}
    </div>
};

export default ResourceItem;