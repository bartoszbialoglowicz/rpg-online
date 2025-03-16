import Button from "./Button";
import Modal from "./Modal";

import './Alert.css';

type Props = {
    title: string, 
    description: string, 
    buttonText: string, 
    onButtonClick: () => void, 
    onOutOfBoxClickHandler: () => void,
    children?: JSX.Element
};

const Alert: React.FC<Props> = (props) => {
    return <Modal onClickHandler={props.onOutOfBoxClickHandler} size="small">
        <div className="alert">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.children && <div className="alert-content">{props.children}</div>}
            <Button text={props.buttonText} onClickHandler={props.onButtonClick}/>
        </div>
    </Modal>
    
};

export default Alert;