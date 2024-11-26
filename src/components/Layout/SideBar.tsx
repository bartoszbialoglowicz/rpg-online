import { mainContentName } from '../../utils/types';
import SideBarList from '../Sidebar/SideBarList';
import './SideBar.css';

type Props = {
    setCurrentMainContent: (name: mainContentName) => void,
    menuHidden: boolean
}

const SideBar: React.FC<Props> = (props) => {
    
    const classes = props.menuHidden ? 'sidebar hidden' : 'sidebar';

    return <div className={classes}>
        <SideBarList setCurrentMainContent={props.setCurrentMainContent}/>
    </div>
};

export default SideBar;