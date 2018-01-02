import React from 'react';
import Modal from 'react-modal';
import './style.css';

const OptionModal = props => 
  <Modal
    isOpen={!!props.message}
    onRequestClose={props.closeModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Error</h3>
    {props.message && <p className="modal__body">{props.message}</p>}
    <button className="modal__button" onClick={props.closeModal}>Close</button>
  </Modal>
export default OptionModal;
