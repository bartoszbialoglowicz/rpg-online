import { mainContentName } from '../../utils/settings';
import './SideBarListItem.css';

const SideBarListItem: React.FC<{name: mainContentName, setCurrentMainContent: (name: mainContentName) => void}> = (props) => {
    
    const onClickHandler = () => {
        props.setCurrentMainContent(props.name);
    }
    
    return <li onClick={onClickHandler}>
        <div className="sidebar-list-item-name">
            <p>{props.name}</p>
        </div>
    </li>
};

export default SideBarListItem;