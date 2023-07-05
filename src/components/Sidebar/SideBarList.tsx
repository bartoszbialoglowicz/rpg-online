import SideBarListItem from "./SideBarListIItem";

import news from '../../assets/svgs/news-svgrepo-com.svg';
import character from '../../assets/svgs/user-svgrepo-com.svg';
import equipment from '../../assets/svgs/backpack-svgrepo-com.svg';
import map from '../../assets/svgs/map-svgrepo-com.svg';
import store from '../../assets/svgs/store-svgrepo-com.svg';
import './SideBarList.css';
import { mainContentName } from "../../utils/types";

const SideBarList: React.FC<{setCurrentMainContent: (name: mainContentName) => void}> = (props) => {

    const tmpList = [
        <SideBarListItem iconPath={news} name="NEWS" setCurrentMainContent={props.setCurrentMainContent} key="NEWS"/>,
        <SideBarListItem iconPath={character} name="CHARACTER" setCurrentMainContent={props.setCurrentMainContent} key="CHARACTER"/>,
        <SideBarListItem iconPath={equipment} name="EQUIPMENT" setCurrentMainContent={props.setCurrentMainContent} key="EQUIPMENT" />,
        <SideBarListItem iconPath={map} name="MAP" setCurrentMainContent={props.setCurrentMainContent} key="MAP" />,
        <SideBarListItem iconPath={store} name="STORE" setCurrentMainContent={props.setCurrentMainContent} key="STORE" />,
        <SideBarListItem iconPath={store} name="ENEMIES" setCurrentMainContent={props.setCurrentMainContent} key="ENEMIES" />
    ]

    return <div className="sidebar-list">
        <ul>
        {tmpList}
        </ul>
    </div>
};

export default SideBarList;