import { mainContentName } from '../../utils/types';
import SideBarList from '../Sidebar/SideBarList';
import './SideBar.css';

const SideBar: React.FC<{setCurrentMainContent: (name: mainContentName) => void}> = (props) => {
    return <div className="sidebar">
        <SideBarList setCurrentMainContent={props.setCurrentMainContent}/>
    </div>
};

export default SideBar;