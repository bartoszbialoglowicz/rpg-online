import './MainNewsBanner.css';

const MainNewsBanner: React.FC<{path: string}> = (props) => {
    return <div className="main-news-banner">
        <img src={props.path} alt=""></img>
    </div>
};

export default MainNewsBanner;