import News from "../../models/News";
import MainNewsBanner from "./MainNewsBanner";
import MainNewsList from "./MainNewsList";

import './MainNewsContainer.css';
import img from '../../assets/images/tmp_news.jpg';
import img2 from '../../assets/images/802668.png';
import img3 from '../../assets/images/982990.jpg';
import img4 from '../../assets/images/High_resolution_wallpaper_background_ID_77700660618.jpg';
import img5 from '../../assets/images/the-witcher-3-wild-hunt-hearts-of-stone-4k-6a.jpg';
import { useState } from "react";

const MainNewsContainer = () => {

    // TODO: import news list from API

    const tmpNewsList = [
        new News(0, "Game realease date: I don't know yet", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged", img),
        new News(1, "News 2", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged", img2),
        new News(2, "News 3", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged", img3),
        new News(3, "News 4", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged", img4),
        new News(4, "News 5", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged", img5)
    ];

    const [currentNews, setCurrentNews] = useState<News>(tmpNewsList[0]);

    const setCurrentNewsHandler = (index: number) => {
        setCurrentNews(tmpNewsList[index]);
    }

    return <div className="main-news-container">
        <MainNewsBanner path={currentNews.imagePath} title={currentNews.title} text={currentNews.text}/>
        <MainNewsList newsList={tmpNewsList} setCurrentNewsHandler={setCurrentNewsHandler}/>
    </div>
};

export default MainNewsContainer;