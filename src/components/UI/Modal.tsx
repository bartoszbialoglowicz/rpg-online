import { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import './Modal.css';

const BackDrop: React.FC<{onClickHandler: () => void}> = (props) => {
    return <div className="backdrop" onClick={props.onClickHandler}></div>
}

const ModalOverlay: React.FC<{children: JSX.Element, applyClose: boolean}> = (props) => {
    const modalClose = props.applyClose ? 'modal-close' : '';
    return <div className={`modal ${modalClose}`}>
        <div className="modal-content">
            {!modalClose && props.children}
        </div>
    </div>
}

const overlaysElement = document.getElementById('overlays');

const Modal: React.FC<{children: JSX.Element, onClickHandler: () => void}> = (props) => {
    const [modalClose, setModalClose] = useState(false);

    const onClickModifier = () => {
        setModalClose(true);
        setTimeout(() => {
            props.onClickHandler();
        }, 400);
    }

    return <>
        {overlaysElement && ReactDOM.createPortal(<BackDrop onClickHandler={onClickModifier}/>, overlaysElement)}
        {overlaysElement && ReactDOM.createPortal(<ModalOverlay applyClose={modalClose}>{props.children}</ModalOverlay>, overlaysElement)}
    </>
}

export default Modal;