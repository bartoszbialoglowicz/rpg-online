import './ResourceItem.css';

const ResourceItem: React.FC<{name: string, value: number, dark: boolean}> = (props) => {
    
    // Check if there should be dark background
    const styles = props.dark ? "character-resource-item dark" : "character-resource-item";
    
    return <div className={styles}>
        {`${props.name}: ${props.value}`}
    </div>
};

export default ResourceItem;