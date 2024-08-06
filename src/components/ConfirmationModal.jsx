import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <h2 className="mb-4 text-xl font-semibold text-center">Confirm</h2>
      <p className="mb-4 text-center">{message}</p>
      <div className="flex justify-between">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
