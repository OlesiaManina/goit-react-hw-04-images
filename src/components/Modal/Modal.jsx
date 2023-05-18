import { useEffect } from "react";
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, ...props}) => {

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();}
    }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
        window.removeEventListener('keydown', handleKeyDown)
        }

    }, [onClose])

    const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
        onClose();
    }
    }

    return createPortal (
    <div className={css.overlay} onClick={handleBackdrop}>
        <div className={css.modal}>
        {props.children}
      </div>
    </div>, modalRoot)
    }


export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func,
}
