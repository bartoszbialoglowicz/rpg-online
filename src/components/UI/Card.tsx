import './Card.css';

type Props = {
    children: JSX.Element
}

const Card: React.FC<Props> = (props) => {
    return <div className="card">
        {props.children}
    </div>
};

export default Card;