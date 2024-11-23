import { mainContentName } from '../../utils/types';
import './SideBarListItem.css';

const SideBarListItem: React.FC<{iconPath: string, name: mainContentName, setCurrentMainContent: (name: mainContentName) => void}> = (props) => {
    
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