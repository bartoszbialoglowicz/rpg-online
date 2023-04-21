import News from "../../models/News";
import MainNewsBanner from "./MainNewsBanner";
import MainNewsList from "./MainNewsList";

import './MainNewsContainer.css';
import img from '../../assets/images/tmp_news.jpg';

const MainNewsContainer = () => {

    // TODO: import news list from API

    const tmpNewsList = [
        new News(0, "News 1", img),
        new News(1, "News 2", img),
        new News(2, "News 3", img),
        new News(3, "News 4", img),
        new News(4, "News 5", img)
    ];

    return <div className="main-news-container">
        <MainNewsBanner path={tmpNewsList[0].imagePath}/>
        <MainNewsList newsList={tmpNewsList} />
    </div>
};

export default MainNewsContainer;