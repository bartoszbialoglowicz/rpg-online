import News from "../../models/News";
import MainNewsListItem from "./MainNewsListItem";

import './MainNewsList.css';

const MainNewsList: React.FC<{newsList: News[], setCurrentNewsHandler: (index: number) => void}> = (props) => {
    const newsItems = props.newsList.map((el: News, index: number) => {
        return <MainNewsListItem key={el.id} title={el.title} setCurrentNewsHandler={props.setCurrentNewsHandler} index={index}/>
    })

    return <div className="main-news-list">
        {newsItems}
    </div>
};

export default MainNewsList;