import './Button.css';

const Button: React.FC<{onClickHandler: () => void, text: string}> = (props) => {
    return <button onClick={props.onClickHandler} className="button">
        {props.text}
    </button>
};

export default Button;