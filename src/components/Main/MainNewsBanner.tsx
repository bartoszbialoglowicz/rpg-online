import './MainNewsBanner.css';

const MainNewsBanner: React.FC<{path: string, text: string, title: string}> = (props) => {
    return <div className="main-news-banner">
        <img src={props.path} alt=""></img>
        <div className='main-news-banner-text'>
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </div>
    </div>
};

export default MainNewsBanner;