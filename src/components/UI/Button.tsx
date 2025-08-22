import './Button.css';

type Props = {
    text: string,
    onClickHandler?: () => void
}


const Button: React.FC<Props> = (props) => {

    const onClickHandler = () => {
        if (props.onClickHandler)
            props.onClickHandler();
    }

    return <div className='button-dark-blue' onClick={onClickHandler}>
        {props.text}
    </div>
}
export default Button;