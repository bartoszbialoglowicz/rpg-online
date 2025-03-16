import './PageTitle.css';

type Props = {
    title: string;
}

const PageTitle: React.FC<Props> = (props) => {
    return (
        <div className="page-title">
        <h1>{props.title}</h1>
        </div>
    );
}

export default PageTitle;