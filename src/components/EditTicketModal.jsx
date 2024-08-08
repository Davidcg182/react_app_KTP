import React, { useState } from 'react';
import Modal from 'react-modal';

const EditTicketModal = ({ isOpen, onClose, ticket, onUpdateTicket }) => {
    const [description, setDescription] = useState(ticket.description);
    const [summary, setSummary] = useState(ticket.summary);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://node-app-ktp.onrender.com/tickets/update/${ticket.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ description, summary }),
            });

            const data = await response.json();

            if (data.status === 'success') {

                console.log('editd modal', data)
                onUpdateTicket(data.data);
                onClose();
            } else if (data.status === 'fail' && data.message.toUpperCase().includes('AUTH')) {
                alert('No tienes permisos para realizar esta accion');
                onClose();
            } else {
                console.error('Failed to update ticket:', data.message);
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="flex justify-center items-center min-h-screen"
        >
            <form className="bg-white p-4 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>
                <div className="mb-4">
                    <label className="block mb-2">Summary</label>
                    <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Update
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditTicketModal;
