const ResourceItem: React.FC<{name: string, value: number}> = (props) => {
    return <div className="character-resource-item">
        <p>{`${props.name}: ${props.value}`}</p>
    </div>
};

export default ResourceItem;