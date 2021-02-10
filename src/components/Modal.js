import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className="modal-container">
            <div className="modal-header">
                <h2>{props.title}</h2>
            </div>
            <div className="modal-section">
                {props.children}
            </div>
            <div className="modal-footer">
                {props.successStatus ? 
                (<button className="complete-btn modal-btn" onClick={props.onCancel}>Close</button>)
                : 
                (<div>
                <button className="delete-btn modal-btn" onClick={props.onCancel}><i class="fas fa-window-close"></i>  Cancel</button>
                <button className="complete-btn modal-btn" onClick={props.onConfirm}><i class="fas fa-check"></i>  Confirm</button>
                </div>)}
            </div>
        </div>
    )
}

export default Modal;