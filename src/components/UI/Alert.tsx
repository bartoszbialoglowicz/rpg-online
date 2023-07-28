import Modal from "./Modal";

const Alert: React.FC<{title: string, description: string, onClickHandler: () => void}> = (props) => {
    return <Modal onClickHandler={props.onClickHandler}>
        <div className="alert">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        </div>
    </Modal>
    
};

export default Alert;