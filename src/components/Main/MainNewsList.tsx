import News from "../../models/News";
import MainNewsListItem from "./MainNewsListItem";

const MainNewsList: React.FC<{newsList: News[]}> = (props) => {
    const newsItems = props.newsList.map((el: News) => {
        return <MainNewsListItem key={el.id} title={el.title}/>
    })

    return <div className="main-news-list">
        {newsItems}
    </div>
};

export default MainNewsList;