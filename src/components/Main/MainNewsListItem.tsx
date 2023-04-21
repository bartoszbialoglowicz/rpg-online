const MainNewsListItem: React.FC<{title: string}> = (props) => {
    return <div className="main-news-list-item">
        <h2>{props.title}</h2>
    </div>
};

export default MainNewsListItem;