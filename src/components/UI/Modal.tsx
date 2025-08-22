import { useState, type JSX } from "react"
import ReactDOM from "react-dom"

import './Modal.css';

const BackDrop: React.FC<{onClickHandler: () => void}> = (props) => {
    return <div className="backdrop" onClick={props.onClickHandler}></div>
}

const ModalOverlay: React.FC<{children: JSX.Element, applyClose: boolean, size: "small" | "medium"}> = (props) => {
    const modalClose = props.applyClose ? 'modal-close' : '';
    return <div className={`modal ${modalClose} size-${props.size}`}>
        <div className="modal-content">
            {!modalClose && props.children}
        </div>
    </div>
} 

const overlaysElement = document.getElementById('overlays');

const Modal: React.FC<{children: JSX.Element, size: "small" | "medium", onClickHandler: () => void}> = (props) => {
    const [modalClose, setModalClose] = useState(false);

    const delay = 400;

    const onClickModifier = (fn: Function) => {
        setModalClose(true);
        setTimeout(() => {
            fn();
        }, delay);
    }

    return <>
        {overlaysElement && ReactDOM.createPortal(<BackDrop onClickHandler={() => {onClickModifier(props.onClickHandler)}}/>, overlaysElement)}
        {overlaysElement && ReactDOM.createPortal(<ModalOverlay size={props.size} applyClose={modalClose}>{props.children}</ModalOverlay>, overlaysElement)}
    </>
}

export default Modal;