import React from 'react';
import Modal from 'react-modal';

const DeleteTicketModal = ({ isOpen, onClose, ticket, onDeleteTicket }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://node-app-ktp.onrender.com/tickets/delete/${ticket.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        onDeleteTicket(ticket.id);
        onClose();
      } else if (data.status === 'fail' && data.message.toUpperCase().includes('AUTH')) {
        alert('No tienes permisos para realizar esta accion');
        onClose();
      } else {
        console.error('Failed to delete ticket:', data.message);
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex justify-center items-center min-h-screen"
    >
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Eliminar Ticket</h2>
        <p>¿Esta seguro que desea eliminar este ticket? (esta accion no se puede deshacer)</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTicketModal;
