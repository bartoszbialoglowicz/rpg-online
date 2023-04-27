import { mainContentName } from '../../utils/types';
import './SideBarListItem.css';

const SideBarListItem: React.FC<{iconPath: string, name: mainContentName, setCurrentMainContent: (name: mainContentName) => void}> = (props) => {
    
    const onClickHandler = () => {
        props.setCurrentMainContent(props.name);
    }
    
    return <li onClick={onClickHandler}>
        <div className="sidebar-list-item-image">
            <img src={props.iconPath} alt={props.name} />
        </div>
        <div className="sidebar-list-item-name">
            <p>{props.name}</p>
        </div>
    </li>
};

export default SideBarListItem;