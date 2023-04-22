import './SideBarListItem.css';

const SideBarListItem: React.FC<{iconPath: string, name: string}> = (props) => {
    return <li>
        <div className="sidebar-list-item-image">
            <img src={props.iconPath} alt={props.name} />
        </div>
        <div className="sidebar-list-item-name">
            <p>{props.name}</p>
        </div>
    </li>
};

export default SideBarListItem;