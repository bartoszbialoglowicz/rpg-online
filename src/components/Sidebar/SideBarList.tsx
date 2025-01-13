import SideBarListItem from "./SideBarListIItem";
import './SideBarList.css';
import { mainContentName } from "../../utils/settings";

const SideBarList: React.FC<{setCurrentMainContent: (name: mainContentName) => void}> = (props) => {

    const tmpList = [
        <SideBarListItem name="NEWS" setCurrentMainContent={props.setCurrentMainContent} key="NEWS"/>,
        <SideBarListItem name="EQUIPMENT" setCurrentMainContent={props.setCurrentMainContent} key="EQUIPMENT" />,
        <SideBarListItem name="MAP" setCurrentMainContent={props.setCurrentMainContent} key="MAP" />,
        <SideBarListItem name="STORE" setCurrentMainContent={props.setCurrentMainContent} key="STORE" />,
        <SideBarListItem name="ENEMIES" setCurrentMainContent={props.setCurrentMainContent} key="ENEMIES" />
    ]

    return <div className="sidebar-list">
        <ul>
        {tmpList}
        </ul>
    </div>
};

export default SideBarList;