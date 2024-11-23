import Button from "./Button";
import Modal from "./Modal";

const Alert: React.FC<{title: string, description: string, buttonText: string, onButtonClick: () => void, onOutOfBoxClickHandler: () => void}> = (props) => {
    return <Modal onClickHandler={props.onOutOfBoxClickHandler}>
        <div className="alert">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <Button text={props.buttonText} onClickHandler={props.onButtonClick}/>
        </div>
    </Modal>
    
};

export default Alert;