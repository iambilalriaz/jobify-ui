import React from 'react';
import { Modal } from 'react-bootstrap';

const LogoutModal = ({ show, handleClose, confirmHandler }) => {
  return (
    <Modal
      className='preferences-modal'
      centered
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Do you want to logout?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='logout-buttons'>
          <span onClick={handleClose}>No</span>
          <span onClick={confirmHandler}>Yes</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
