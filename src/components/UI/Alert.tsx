import Modal from "./Modal";
import SubmitInput from "./SubmitInput";

const Alert: React.FC<{title: string, description: string, buttonText: string, onButtonClick: () => void, onOutOfBoxClickHandler: () => void}> = (props) => {
    return <Modal onClickHandler={props.onOutOfBoxClickHandler}>
        <div className="alert">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button onClick={props.onButtonClick}>{props.buttonText}</button>
        </div>
    </Modal>
    
};

export default Alert;