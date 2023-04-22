import './MainNewsListItem.css';

const MainNewsListItem: React.FC<{title: string, setCurrentNewsHandler: (index: number) => void, index: number}> = (props) => {

    const onClickHandler = () => {
        props.setCurrentNewsHandler(props.index);
    }

    return <div className="main-news-list-item" onClick={onClickHandler}>
        <h4>{props.title}</h4>
    </div>
};

export default MainNewsListItem;