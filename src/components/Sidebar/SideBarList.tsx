import SideBarListItem from "./SideBarListIItem";

import news from '../../assets/svgs/news-svgrepo-com.svg';
import './SideBarList.css';

const SideBarList = () => {

    const tmpList = [
        <SideBarListItem iconPath={news} name="NEWS" />
    ]

    return <div className="sidebar-list">
        <ul>
        {tmpList}
        </ul>
    </div>
};

export default SideBarList;