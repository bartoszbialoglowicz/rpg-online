import SideBarListItem from "./SideBarListIItem";
import './SideBarList.css';
import type { mainContentName } from "../../utils/settings";

const SideBarList: React.FC<{setCurrentMainContent: (name: mainContentName) => void}> = (props) => {

    const tmpList = [
        <SideBarListItem name="STAGE" setCurrentMainContent={props.setCurrentMainContent} key="STAGE"/>,
        <SideBarListItem name="EQUIPMENT" setCurrentMainContent={props.setCurrentMainContent} key="EQUIPMENT" />,
        <SideBarListItem name="MAP" setCurrentMainContent={props.setCurrentMainContent} key="MAP" />,
        <SideBarListItem name="STORE" setCurrentMainContent={props.setCurrentMainContent} key="STORE" />,
        <SideBarListItem name="ENEMIES" setCurrentMainContent={props.setCurrentMainContent} key="ENEMIES" />,
        <SideBarListItem name="QUESTS" setCurrentMainContent={props.setCurrentMainContent} key="QUESTS" />
    ]

    return <div className="sidebar-list">
        <ul>
        {tmpList}
        </ul>
    </div>
};

export default SideBarList;