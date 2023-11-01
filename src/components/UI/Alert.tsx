import Button from "./Button";
import Modal from "./Modal"

type Props = {
    title: string, 
    description: string, 
    buttonText: string, 
    onButtonClick: () => void, 
    onOutOfBoxClickHandler: () => void,
    children?: JSX.Element
}

const Alert: React.FC<Props> = (props) => {
    return <Modal onClickHandler={props.onOutOfBoxClickHandler}>
        <div className="alert">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        {props.children}
        <Button text={props.buttonText} onClickHandler={props.onButtonClick} />
        </div>
    </Modal>
    
};

export default Alert;